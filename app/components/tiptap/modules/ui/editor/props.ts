import  { type EditorProps } from "@tiptap/pm/view";
import { handleImageUpload } from "#app/components/tiptap/modules/lib/utils/editor";

export const TiptapEditorProps: Partial<EditorProps> = {
  attributes: {
    class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
  },

  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
        const slashCommand = document.querySelector("#slash-command");
        if (slashCommand) {
          return true;
        }
      }
    },
  },

  handlePaste: (view, event, _slice) => {
    if (event.clipboardData?.files?.[0]) {
      event.preventDefault();
      const file = event.clipboardData.files[0];
      void handleImageUpload(file, view, event);
      return true;
    }
    return false;
  },

  handleDrop: (view, event, _slice, moved) => {
    if (!moved && event.dataTransfer?.files?.[0]) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      void handleImageUpload(file, view, event);
      return true;
    }
    return false;
  },
};

export default TiptapEditorProps;