import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function MySpeedDial() {
  return (
    <div className='fixed bottom-4 right-4'>
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size='lg' className='rounded-full'>
            <PlusIcon className='h-5 w-5 transition-transform group-hover:rotate-45' />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction className='h-16 w-16'>
            <HomeIcon className='h-5 w-5' />
            <Typography color='blue-gray' className='text-xs font-normal'>
              Home
            </Typography>
          </SpeedDialAction>
          <SpeedDialAction className='h-16 w-16'>
            <CogIcon className='h-5 w-5' />
            <Typography color='blue-gray' className='text-xs font-normal'>
              Settings
            </Typography>
          </SpeedDialAction>
          <SpeedDialAction className='h-16 w-16'>
            <Link href='/admin/post/create'>
              <PlusCircleIcon className='h-5 w-5' />
              <Typography color='blue-gray' className='text-xs font-normal'>
                Add
              </Typography>
            </Link>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
