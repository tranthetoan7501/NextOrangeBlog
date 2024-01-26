import { HeartIcon } from "@heroicons/react/20/solid";
import React from "react";

interface Props {
  likes: number;
}
export default function HeartLike({ likes }: Props) {
  if (!likes || likes < 1) return null;
  return (
    <div className='absolute rounded-full bg-white p-1 right-0 mr-[-10px] bottom-1 flex items-center shadow-md shadow-gray-400 dark:shadow-none'>
      <span className='text-sm text-gray-700'>{likes}</span>
      <HeartIcon className='h-4 text-red-500' />
    </div>
  );
}
