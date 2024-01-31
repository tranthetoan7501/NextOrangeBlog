import {
  Avatar,
  IconButton,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
interface Props {
  title: string;
  meta: string;
  slug: string;
  thumbnail: string | undefined;
  onDeleteClick?(): void;
}

export default function LatestPostListCard({
  title,
  meta,
  slug,
  onDeleteClick,
  thumbnail,
}: Props) {
  return (
    <ListItem className='bg-white dark:bg-transparent dark:border dark:border-blue-500'>
      <ListItemPrefix>
        <Avatar variant='circular' alt='candice' src={thumbnail} />
      </ListItemPrefix>
      <div>
        <Typography
          variant='h6'
          className='text-gray-900 font-thin dark:text-gray-400'
        >
          {title.substring(0, 60)}
          {title.length > 60 && "..."}
        </Typography>
      </div>
      <ListItemSuffix className='flex'>
        <div className='rounded-full bg-white dark:bg-transparent w-10 h-10 mr-5 flex items-center justify-center border border-blue-700 hover:text-blue-600'>
          <BsPencilSquare />
        </div>
        <div className='rounded-full bg-white dark:bg-transparent w-10 h-10 flex items-center justify-center border border-red-600 hover:text-red-600'>
          <BsFillTrashFill className='' />
        </div>
      </ListItemSuffix>
    </ListItem>
  );
}
