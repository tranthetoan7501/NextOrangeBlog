import { PostDetail } from "@/utils/type";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import dateformat from "dateformat";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

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
  return (
    <Card className='mt-6 w-92 shadow-xl   shadow-gray-300'>
      <Link href={"/admin/post/update/" + slug}>
        <CardHeader
          color='blue-gray'
          className='relative h-56 shadow-xl shadow-gray-600'
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
        <CardBody className='h-56 '>
          <div className='h-44'>
            <Typography
              variant='h5'
              color='blue-gray'
              className='mb-2 font-roboto'
            >
              {title}
            </Typography>
            <Typography className='font-roboto'>
              {meta + " " ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}
              ...
            </Typography>
          </div>

          <div className='flex items-center space-x-1 text-green-700 font-bold'>
            {tags.map((t, index) => (
              <span className='hover:text-orange-600' key={t + index}>
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
        <Typography className='font-normal font-roboto text-lg'>
          {dateformat(createdAt, "d-mmm-yyyy")}
        </Typography>
        {controls ? (
          <></>
        ) : (
          <Button variant='outlined' className='text-red-800 text-xl w-16'>
            <HeartIcon />
            {/* <SolidHeartIcon /> */}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
