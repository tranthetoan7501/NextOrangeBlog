import { CommentResponse } from "@/utils/type";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { use, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { commentTime } from "@/utils/helper";
import {
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";
import { set } from "mongoose";
import CommentForm from "./CommentForm";
interface Props {
  comment: CommentResponse;
}
export default function CommentCard({ comment }: Props) {
  const { owner, createdAt, content, likedByOwner, likes } = comment;
  const { name, avatar } = owner;
  const [isDisplay, setIsDisplay] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const displayReplyForm = () => {
    setShowForm(true);
  };
  const hideReplyForm = () => {
    setShowForm(false);
  };
  return (
    <div
      ref={dropdownRef}
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
      <div className='w-full'>
        <div className='flex'>
          <div className='rounded-2xl dark:bg-blue-300 bg-gray-200 pl-4 pr-3 py-2 ml-4'>
            <div className='font-bold'>{name}</div>
            {parse(content)}
          </div>
          <div className='sm:w-28 w-52 flex items-center justify-center pr-2'>
            {isDisplay && (
              <Popover placement='bottom'>
                <PopoverHandler>
                  <span className='text-gray-600 font-bold text-xl dark:text-gray-300 ml-1 flex items-center pb-2 justify-center rounded-full hover:bg-gray-200  dark:hover:bg-gray-800 w-6 h-6 m-auto cursor-pointer hover:text-blue-500 dark:hover:text-blue-400'>
                    ...
                  </span>
                </PopoverHandler>
                <PopoverContent className='my-z-100 p-1 dark:bg-black border dark:border-purple-700'>
                  <span className='pb-1'>
                    <div className='flex w-20 py-2 items-center px-2 rounded-lg text-black hover:bg-blue-300 dark:hover:bg-blue-800 cursor-pointer'>
                      <BsPencilSquare className='dark:text-white' />
                      <span className='ml-3 dark:text-white'>Edit</span>
                    </div>
                  </span>

                  <span className='block '>
                    <div className='flex  w-20 px-2 py-2 items-center rounded-lg mt-1 text-black hover:bg-blue-300 dark:hover:bg-purple-800  cursor-pointer'>
                      <BsFillTrashFill className='dark:text-white' />
                      <span className='ml-3 dark:text-white'>Delete</span>
                    </div>
                  </span>
                </PopoverContent>
              </Popover>
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
          <span
            onClick={displayReplyForm}
            className='text-gray-900 dark:text-gray-300 text-sm pl-4 cursor-pointer hover:text-blue-700 dark:hover:text-blue-400'
          >
            Phản hồi
          </span>
        </div>
        {showForm && (
          <div className='mt-2'>
            <CommentForm onSubmit={() => {}} onClose={hideReplyForm} />
          </div>
        )}
      </div>
    </div>
  );
}
