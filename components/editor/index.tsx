"use client";
import ToolBar from "@/components/editor/ToolBar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
  });
  return (
    <>
      <ToolBar editor={editor} />
      <button
        onClick={() => {
          if (!editor) return;
          editor.chain().focus().toggleBold().run();
        }}
      >
        Bold
      </button>
      <div className='border-2 border-teal-600 rounded'>
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
