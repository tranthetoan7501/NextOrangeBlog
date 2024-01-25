import useAuth from "@/hooks/useAuth";
import useEditorConfig from "@/hooks/useEditorConfig";
import { Avatar, IconButton } from "@material-tailwind/react";
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";

interface Props {
  onSubmit: (content: string) => void;
  busy?: boolean;
  initialState?: string;
}
export default function CommentForm({ onSubmit, busy, initialState }: Props) {
  const { editor } = useEditorConfig({ placeholder: "Add your comment..." });
  const handleSubmit = () => {
    if (editor && !busy) {
      const value = editor?.getHTML();
      if (value === "<p></p>") return;
      if (value) {
        onSubmit(value);
        editor?.chain().focus().setContent("").run();
      }
    }
  };
  const handleSubmitEnter = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit();
    }
  };
  useEffect(() => {
    if (typeof initialState === "string")
      editor?.chain().focus().setContent(initialState).run();
  }, [editor, initialState]);
  const userProfile = useAuth();
  if (!userProfile)
    return (
      <>
        <div className='dark:text-gray-300 text-gray-800 ml-5'>
          Đăng nhập để bình luận
        </div>
      </>
    );
  return (
    <div className='pr-2 pt-4 flex justify-center space-x-4'>
      <div className='flex w-full h-15 flex-row items-center rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2 dark:border-purple-600 '>
        <div className='flex w-10'>
          <Avatar
            variant='circular'
            size='sm'
            alt='tania andrew'
            className='border border-gray-900 p-0.5 dark:border-white flex-none'
            src={userProfile?.avatar || "/defaultAvatar.png"}
          />
        </div>
        <EditorContent
          editor={editor}
          className='flex-grow bg-transparent outline-none text-lg text-gray-700 pl-3 dark:text-gray-200'
          onKeyDown={handleSubmitEnter}
        />
        <div>
          <IconButton
            variant='text'
            className='rounded-full'
            onClick={handleSubmit}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
              className='h-5 w-5 dark:text-blue-500'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
          </IconButton>
        </div>
      </div>
      {/* <Button color='green'>Comment form</Button> */}
    </div>
  );
}
