import { CommentResponse } from "@/utils/type";
import { Avatar, Button } from "@material-tailwind/react";
import React, { use, useState } from "react";
import parse from "html-react-parser";
import { commentTime } from "@/utils/helper";
import { BsFillReplyAllFill } from "react-icons/bs";
import { set } from "mongoose";
interface Props {
  comment: CommentResponse;
}
export default function CommentCard({ comment }: Props) {
  const { owner, createdAt, content, likedByOwner, likes } = comment;
  const { name, avatar } = owner;
  const [isDisplay, setIsDisplay] = useState(false);
  return (
    <div
      className='text-black flex py-3'
      onMouseEnter={() => setIsDisplay(true)}
      onMouseLeave={() => setIsDisplay(false)}
    >
      <Avatar
        variant='circular'
        size='sm'
        alt='tania andrew'
        className='border border-gray-900 p-0.5 dark:border-blue-700 flex-none'
        src={avatar || "/defaultAvatar.png"}
      />
      <div>
        <div className='flex'>
          <div className='rounded-2xl dark:bg-blue-300 bg-gray-200 pl-4 pr-3 py-2 ml-4 sm:w-11/12 w-11/12'>
            <div className='font-bold'>{name}</div>
            {parse(content)}
          </div>
          <div className='w-12 flex items-center justify-center  pr-2'>
            {isDisplay && (
              <span className='text-gray-600 font-bold text-xl dark:text-gray-300 ml-1 flex items-center pb-2 justify-center rounded-full hover:bg-gray-200  dark:hover:bg-gray-800 w-6 h-6 m-auto cursor-pointer hover:text-blue-500 dark:hover:text-blue-400'>
                ...
              </span>
            )}
          </div>
        </div>

        <div className='flex'>
          <span className='text-gray-500 text-sm pl-5'>
            {commentTime(createdAt)}
          </span>
          <span className='text-gray-900 dark:text-gray-300 text-sm pl-4 cursor-pointer hover:text-pink-600 dark:hover:text-pink-400'>
            Thích
          </span>
          <span className='text-gray-900 dark:text-gray-300 text-sm pl-4 cursor-pointer hover:text-blue-700 dark:hover:text-blue-400'>
            Phản hồi
          </span>
        </div>
      </div>
    </div>
  );
}
