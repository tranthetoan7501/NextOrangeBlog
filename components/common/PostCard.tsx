import { PostDetail } from "@/utils/type";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import dateformat from "dateformat";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import useFormattedDate from "@/hooks/useFormateDate";

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

export function PostCard({
  controls = false,
  post,
  busy,
  onDeleteClick,
}: Props) {
  const { title, slug, meta, createdAt, tags, thumbnail } = post;
  const date = useFormattedDate(createdAt);
  return (
    <Card className='mt-6 w-92 shadow-xl shadow-gray-300 dark:bg-black  dark:shadow-lg dark:border dark:border-purple-800'>
      <Link href={"/" + slug}>
        <CardHeader
          color='blue-gray'
          className='relative h-56 shadow-xl shadow-gray-600 dark:shadow-none'
        >
          <Image
            src={
              thumbnail ||
              "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            }
            alt='card-image'
            fill
            style={{ objectFit: "cover" }}
          />
        </CardHeader>
        <CardBody className='h-56 sm:h-44  xl:h-56'>
          <div className='h-44 sm:h-32  xl:h-44 '>
            <Typography
              variant='h5'
              color='blue-gray'
              className='mb-2 font-roboto dark:text-cyan-500'
            >
              {getFirst10Words(title)}
            </Typography>
            <Typography className='font-roboto dark:text-purple-400'>
              {formatContent(meta) ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum ..."}
            </Typography>
          </div>

          <div className='flex items-center space-x-1 text-green-700 font-bold dark:text-pink-400'>
            {tags.map((t, index) => (
              <span
                className='hover:text-orange-600 dark:hover:text-blue-500'
                key={t + index}
              >
                #{t}
              </span>
            ))}
          </div>
        </CardBody>
      </Link>
      <CardFooter className='pt-0 flex items-center justify-between'>
        {!controls ? (
          <></>
        ) : busy ? (
          <span className='animate-pulse'>Removing</span>
        ) : (
          <div className='flex items-center justify-between'>
            <Link href={"/admin/post/update/" + slug}>
              <p className=' text-gray-600 text-xl hover:text-orange-700 font-bold'>
                Edit
              </p>
            </Link>
            <p
              className='ml-5 text-xl text-gray-600  hover:text-orange-700 font-bold cursor-pointer'
              onClick={onDeleteClick}
            >
              Delete
            </p>
          </div>
        )}

        <Typography className='font-normal font-roboto text-lg dark:text-gray-300'>
          {date}
        </Typography>
        {controls ? (
          <></>
        ) : (
          <Button
            variant='outlined'
            className='text-red-800 text-xl w-16 dark:border-cyan-600'
          >
            <HeartIcon />
            {/* <SolidHeartIcon /> */}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function getFirst10Words(str: string) {
  // Chia chuỗi thành mảng các từ
  const wordsArray = str.split(/\s+/);
  // Lấy 10 từ đầu tiên
  if (str.length < 80) return str;
  let first10Words = wordsArray.slice(0, 14);

  if (first10Words.join(" ").length > 80) {
    first10Words = wordsArray.slice(0, 8);
  }
  return first10Words.join(" ") + " ...";
}

function formatContent(str: string) {
  // Chia chuỗi thành mảng các từ
  const wordsArray = str.split(/\s+/);
  // Lấy 10 từ đầu tiên
  let content = wordsArray.slice(0, wordsArray.length - 3);

  return content.join(" ") + " ...";
}
