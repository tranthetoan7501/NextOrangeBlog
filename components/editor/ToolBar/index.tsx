import { DropDown } from "@/components/DropDown";
import { getFocusedEditor } from "@/utils/EditorUtils";
import { Editor } from "@tiptap/react";
interface Props {
  editor: Editor | null;
  onOpenImageClick?(): void;
}

export default function ToolBar({ editor, onOpenImageClick }: Props) {
  if (!editor) return null;
  const options = [
    {
      label: "Paragraph",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];
  return (
    <>
      <DropDown name='Font' options={options} />
    </>
  );
}
