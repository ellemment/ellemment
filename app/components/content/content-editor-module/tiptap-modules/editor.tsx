// #app/components/content/content-editor-module/tiptap-modules/editor.tsx

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import { useCompletion } from "#app/utils/editor/ai/use-completion.ts";
import DEFAULT_EDITOR_CONTENT from "#app/utils/editor/utils/default-content";
import { TiptapEditorProps } from "#app/utils/editor/utils/props.ts";
import { EditorBubbleMenu } from "./components/buble-menu.tsx";
import { TiptapExtensions } from "./extensions/extensions.tsx";

interface EditorProps {
  name: string;
  id: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Editor({ name, id, defaultValue, onValueChange }: EditorProps) {
  // Parse the defaultValue if it's a JSON string
  const initialContent = defaultValue ? 
    (typeof defaultValue === 'string' ? JSON.parse(defaultValue) : defaultValue) 
    : DEFAULT_EDITOR_CONTENT;

  const [content, setContent] = useState(initialContent);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [hydrated, setHydrated] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    try {
      const json = editor.getJSON();
      const htmlContent = editor.getHTML();
      setSaveStatus("Saving...");
      setContent(json);
      onValueChange?.(htmlContent);
      
      // Simulate a delay in saving
      setTimeout(() => {
        setSaveStatus("Saved");
      }, 500);
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus("Error saving");
      toast.error('Failed to save content');
    }
  }, 750);

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/ai/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        return;
      }
    },
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleComplete = useCallback(async (text: string) => {
    try {
      await complete(text);
    } catch (error) {
      console.error('Error during completion:', error);
      toast.error('Failed to generate completion');
    }
  }, [complete]);

  const handleEditorUpdate = useCallback((e: any) => {
    setSaveStatus("Unsaved");
    const selection = e.editor.state.selection;
    const lastTwo = e.editor.state.doc.textBetween(
      selection.from - 2,
      selection.from,
      "\n"
    );
    
    if (lastTwo === "++" && !isLoading) {
      e.editor.commands.deleteRange({
        from: selection.from - 2,
        to: selection.from,
      });
      void handleComplete(e.editor.getText());
    } else {
      void debouncedUpdates(e);
    }
  }, [debouncedUpdates, isLoading, handleComplete]);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: handleEditorUpdate,
    autofocus: "end",
    immediatelyRender: false,
  });

  const prev = useRef("");

  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff, {
      parseOptions: {
        preserveWhitespace: "full",
      },
    });
  }, [isLoading, editor, completion]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };

    const mousedownHandler = async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        const text = editor?.getText() || "";
        await handleComplete(text).catch(error => {
          console.error('Error resuming completion:', error);
          toast.error('Failed to resume completion');
        });
      }
    };

    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, completion.length, handleComplete]);

  useEffect(() => {
    if (editor && content && !hydrated) {
      // Now content is guaranteed to be an object
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);
  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 m-4 sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    >
      <input 
        type="hidden" 
        name={name} 
        id={id} 
        value={typeof content === 'string' ? content : JSON.stringify(content)} 
      />
      
      <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>

      {editor ? (
        <>
          <EditorContent editor={editor} />
          <EditorBubbleMenu editor={editor} />
        </>
      ) : null}
    </div>
  );
}
