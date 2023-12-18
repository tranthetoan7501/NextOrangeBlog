import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface Prop {
  open: boolean;
  handler: () => void;
}
export default function SignInDialog({ open, handler: handleOpen }: Prop) {
  return (
    <div>
      <Dialog
        size='xs'
        open={open}
        handler={handleOpen}
        className=' bg-transparent shadow-none'
      >
        <Card className='mx-auto w-full max-w-[24rem]'>
          <CardHeader
            variant='gradient'
            color='blue'
            className='flex mb-2 h-28 place-items-center'
          >
            {" "}
            <Image
              className='sm:ml-6'
              src='/Figure.png'
              alt='penguin'
              width={110}
              height={110}
            />
            <Typography variant='h3' color='white'>
              Sign In
            </Typography>
          </CardHeader>

          {/* <CardBody className='flex flex-col gap-4'>
            <Input label='Email' size='lg' crossOrigin={undefined} />
            <Input label='Password' size='lg' crossOrigin={undefined} />
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' crossOrigin={undefined} />
            </div>
          </CardBody> */}
          <CardFooter className='pt-0'>
            {/* <Button
              variant='gradient'
              className='mb-3'
              onClick={handleOpen}
              fullWidth
            >
              Sign In
            </Button> */}
            <Typography
              variant='small'
              className='mt-4 mb-6 flex justify-center'
            >
              Sign in with
            </Typography>
            <div className='sm:mx-7 flex justify-between'>
              <Button
                onClick={async () => await signIn("github")}
                variant='gradient'
                className='mb-2 mx- inline-block px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </Button>

              <Button
                onClick={async () => await signIn("google")}
                type='button'
                data-te-ripple-init
                data-te-ripple-color='light'
                className='bg-red-600 mx-1 mb-2 inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z'
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                  />
                </svg>
              </Button>
              <Button
                onClick={async () => await signIn("facebook")}
                type='button'
                data-te-ripple-init
                data-te-ripple-color='light'
                className='bg-blue-700 mx-1 mb-2 inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                </svg>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}
