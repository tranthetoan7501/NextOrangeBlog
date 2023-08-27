"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
  });
  return (
    <div className='border-2 border-teal-600 rounded'>
      <EditorContent editor={editor} />
    </div>
  );
}
