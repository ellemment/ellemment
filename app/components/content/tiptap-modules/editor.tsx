// #app/components/content/content-editor-module/tiptap-modules/editor.tsx

import { useEditor, EditorContent } from "@tiptap/react"
import { useEffect, useState, useCallback } from "react"
import { toast } from "react-hot-toast"
import { useDebouncedCallback } from "use-debounce"
import DEFAULT_EDITOR_CONTENT from "#app/utils/content/tiptap-module/utils/default-content"
import { TiptapEditorProps } from "#app/utils/content/tiptap-module/utils/props"
import { EditorBubbleMenu } from "./components/buble-menu"
import { TiptapExtensions } from "./extensions/extensions"

interface EditorProps {
  name: string
  id: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function Editor({ name, id, defaultValue, onValueChange }: EditorProps) {
  const initialContent = defaultValue ? 
    (typeof defaultValue === 'string' ? JSON.parse(defaultValue) : defaultValue) 
    : DEFAULT_EDITOR_CONTENT

  const [content, setContent] = useState(initialContent)
  const [hydrated, setHydrated] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    try {
      const json = editor.getJSON()
      const htmlContent = editor.getHTML()
      setContent(json)
      onValueChange?.(htmlContent)
    } catch (error) {
      console.error('Error saving content:', error)
      toast.error('Failed to save content')
    }
  }, 500)

  const handleEditorUpdate = useCallback((e: any) => {
    void debouncedUpdates(e)
  }, [debouncedUpdates])

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: {
      ...TiptapEditorProps,
      attributes: {
        class: "prose prose-lg mx-auto focus:outline-none max-w-full"
      }
    },
    onUpdate: handleEditorUpdate,
    content: initialContent as any,
    autofocus: "end",
    immediatelyRender: false, // Fix for SSR error
  })

  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content)
      setHydrated(true)
    }
  }, [editor, content, hydrated])

  return (
    <div className="relative w-full">
      <input 
        type="hidden" 
        name={name} 
        id={id} 
        value={typeof content === 'string' ? content : JSON.stringify(content)} 
      />

      <div 
        onClick={() => editor?.chain().focus().run()}
        className="min-h-[500px] w-full rounded-lg"
      >
        {editor ? (
          <>
            <EditorContent editor={editor} />
            <EditorBubbleMenu editor={editor} />
          </>
        ) : null}
      </div>
    </div>
  )
}