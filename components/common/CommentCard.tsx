import { CommentResponse } from "@/utils/type";
import { Avatar } from "@material-tailwind/react";
import React from "react";
import parse from "html-react-parser";
interface Props {
  comment: CommentResponse;
}
export default function CommentCard({ comment }: Props) {
  return (
    <div className='text-black flex sm:p-3 p-2'>
      <Avatar
        variant='circular'
        size='sm'
        alt='tania andrew'
        className='border border-gray-900 p-0.5 dark:border-blue-700 flex-none'
        src={comment?.owner.avatar || "/defaultAvatar.png"}
      />
      <div className='rounded-lg dark:bg-blue-300 bg-gray-200 pl-4 pr-3 py-2 ml-4'>
        <div className='font-bold'>{comment.owner.name}</div>
        {parse(comment.content)}
        <div></div>
      </div>
    </div>
  );
}
