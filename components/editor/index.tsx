"use client";
import ToolBar from "@/components/editor/ToolBar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });
  return (
    <>
      <ToolBar editor={editor} />
      <div className='h-[1px] w-full bg-black dark:bg-secondary-light my-3' />
      <EditorContent editor={editor} />
    </>
  );
}
