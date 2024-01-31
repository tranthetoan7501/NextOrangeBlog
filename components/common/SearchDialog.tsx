import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Dialog,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Prop {
  open: boolean;
  handler: () => void;
}
export default function SearchDialog({ open, handler: handleOpen }: Prop) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      router.push(`/search?title=${query}`);
      handleOpen();
    }
  };
  return (
    <div>
      <Dialog
        size='sm'
        open={open}
        handler={handleOpen}
        className='h-14 bg-transparent'
      >
        <DialogHeader className='max-w-md mx-auto'>
          <div className='relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden'>
            <input
              className='peer h-full w-full outline-none text-sm text-gray-700 pl-3'
              type='text'
              id='search'
              placeholder='Search something..'
              value={query}
              onKeyDown={handleKeyDown}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Link
              href={{
                pathname: "/search",
                query: { title: query },
              }}
              className='grid place-items-center h-full w-20 text-black hover:bg-cyan-500 bg-cyan-100 '
              onClick={handleOpen}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </Link>
          </div>
        </DialogHeader>
      </Dialog>
    </div>
  );
}
