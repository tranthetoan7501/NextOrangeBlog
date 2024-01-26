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
import useAuth from "@/hooks/useAuth";
import { HeartIcon } from "@heroicons/react/20/solid";
import HeartLike from "./HeartLike";
interface Props {
  comment: CommentResponse;
  showControls?: boolean;
  onUpdateSubmit?(content: string): void;
  onReplySubmit?(content: string): void;
  onDeleteClick?(): void;
  onLikeClick?(): void;
}
export default function CommentCard({
  comment,
  showControls,
  onUpdateSubmit,
  onReplySubmit,
  onDeleteClick,
  onLikeClick,
}: Props) {
  const { owner, createdAt, content, likedByOwner, likes } = comment;
  const { name, avatar } = owner;
  const [isDisplay, setIsDisplay] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [initialState, setInitialState] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const userProfile = useAuth();
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
    setInitialState("");
  };
  const handleOnEditClick = () => {
    displayReplyForm();
    setInitialState(content);
  };
  const handCommentSubmit = (commentStr: string) => {
    if (initialState) {
      onUpdateSubmit && onUpdateSubmit(commentStr);
    } else {
      onReplySubmit && onReplySubmit(commentStr);
    }
    setShowForm(false);
  };
  return (
    <div
      ref={dropdownRef}
      className='text-black flex pt-2'
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
          <div className='rounded-2xl dark:bg-blue-300 bg-gray-200  pl-4 pr-6 py-2 ml-4 mr-2 relative'>
            <div className='font-bold'>{name}</div>
            {parse(content)}
            <HeartLike likes={likes} />
          </div>
          <div className='sm:w-40 w-80 flex  items-center justify-center pr-2'>
            {userProfile?.id === comment.owner.id && isDisplay && (
              <div className='text-gray-600 text-sm font-bold dark:text-gray-300 ml-1 p-1 h-15 rounded-full flex-row justify-center  m-auto cursor-pointer hover:text-blue-500 dark:hover:text-blue-400'>
                <BsPencilSquare
                  onClick={handleOnEditClick}
                  className='dark:text-gray-900 text-gray-600 rounded-full dark:bg-gray-600 bg-gray-300  p-1 w-6 h-6 dark:hover:bg-white hover:bg-white border hover:border-gray-300 dark:border-none dark:hover:text-blue-700 hover:text-blue-700'
                />
                <BsFillTrashFill
                  onClick={onDeleteClick}
                  className='dark:text-gray-900 text-gray-600 rounded-full dark:bg-gray-600 bg-gray-300  p-1 w-6 h-6 mt-1 dark:hover:bg-white border hover:border-gray-300 hover:bg-white dark:border-none  dark:hover:text-red-700 hover:text-red-700'
                />
              </div>
            )}
          </div>
        </div>

        <div className='flex'>
          <span className='text-gray-500 text-sm pl-5'>
            {commentTime(createdAt)}
          </span>
          <span
            onClick={onLikeClick}
            className={
              "text-gray-900 dark:text-gray-300 text-sm pl-4 cursor-pointer w-12 text-center hover:text-pink-600 dark:hover:text-pink-400 " +
              (likedByOwner ? "text-pink-600 dark:text-pink-400" : "")
            }
          >
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
            <CommentForm
              onSubmit={handCommentSubmit}
              initialState={initialState}
            />
          </div>
        )}
      </div>
    </div>
  );
}
