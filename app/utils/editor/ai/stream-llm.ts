// #app/components/tiptap/modules/lib/ai/openai/openai-stream.ts

import { type ParsedEvent, type ReconnectInterval, createParser } from "eventsource-parser";

export type ChatGPTAgent = "user" | "assistant" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream: boolean;
  n: number;
}

async function chatCompletionStream(payload: OpenAIStreamPayload) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("No OpenAI API key found");
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const stream = new ReadableStream({
      async start(controller) {
        // callback
        function onParse(event: ParsedEvent | ReconnectInterval) {
          if (event.type === "event") {
            const data = event.data;
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data) as { choices: [{ delta: { content?: string } }] };
              const text = json.choices[0].delta?.content || "";
              if (counter < 2 && (text.match(/\n/) || []).length) {
                // this is a prefix character (i.e., "\n\n"), do nothing
                return;
              }
              const queue = encoder.encode(text);
              controller.enqueue(queue);
              counter++;
            } catch (e) {
              // maybe parse error
              controller.error(e);
            }
          }
        }

        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        const parser = createParser(onParse);
        
        try {
          // https://web.dev/streams/#asynchronous-iteration
          for await (const chunk of res.body as any) {
            await Promise.resolve(parser.feed(decoder.decode(chunk))).catch(error => {
              controller.error(error);
            });
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return stream;
  } catch (error) {
    throw new Error(`Failed to create completion stream: ${error}`);
  }
}

export default {
  chatCompletionStream,
};