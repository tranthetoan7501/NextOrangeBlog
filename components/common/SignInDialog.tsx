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
        <Card className='relative mx-auto w-full max-w-[24rem]'>
          <CardHeader
            variant='gradient'
            color='blue'
            className='mb-2 grid h-28 place-items-center'
          >
            <Typography variant='h3' color='white'>
              Sign In
            </Typography>
          </CardHeader>
          <Image
            className='absolute pl-5 right-24 sm:pl-0 sm:right-28 bottom-96'
            src='/Figure.png'
            alt='penguin'
            width={150}
            height={150}
          />
          <CardBody className='flex flex-col gap-4'>
            <Input label='Email' size='lg' crossOrigin={undefined} />
            <Input label='Password' size='lg' crossOrigin={undefined} />
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' crossOrigin={undefined} />
            </div>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button variant='gradient' onClick={handleOpen} fullWidth>
              Sign In
            </Button>
            <Typography variant='small' className='mt-6 flex justify-center'>
              Don&apos;t have an account?
              <Typography
                as='a'
                href='#signup'
                variant='small'
                color='blue'
                className='ml-1 font-bold'
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}
