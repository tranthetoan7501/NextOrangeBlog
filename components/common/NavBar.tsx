import React, { createElement, use, useState } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { useSession, signOut } from "next-auth/react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import SignInDialog from "./SignInDialog";
import { UserProfile } from "@/utils/type";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    onClick: () => {},
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    onClick: () => {},
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    onClick: () => {},
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    onClick: () => {},
  },

  // {
  //   label: "Sign In",
  //   icon: PowerIcon,
  //   action: () => {},
  // },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const [showDialog, setShowDialog] = useState(false);
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const userProfile = data?.user as UserProfile;
  const { toggleTheme } = useDarkMode();
  const toggleShowDialog = () => {
    setShowDialog((cur) => !cur);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
        >
          <Avatar
            variant='circular'
            size='sm'
            alt='tania andrew'
            className='border border-gray-900 p-0.5'
            src={
              userProfile?.avatar ||
              "https://res.cloudinary.com/dcojxsjnw/image/upload/v1677254126/4e984a4f23b46ed4ec342a7614b1364a2b2f7e4d.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-1 dark:bg-black dark:border-blue-700'>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className='flex items-center gap-2 rounded dark:text-pink-400 dark:hover:bg-purple-900'
            >
              {createElement(icon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Typography
                as='span'
                variant='small'
                className='font-normal dark:text-cyan-400'
                color='inherit'
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
        <MenuItem
          key='Switch Theme'
          onClick={toggleTheme}
          className='flex items-center gap-2 rounded dark:text-pink-400 dark:hover:bg-purple-900'
        >
          {createElement(LightBulbIcon, {
            className: "h-4 w-4",
            strokeWidth: 2,
          })}
          <Typography
            as='span'
            variant='small'
            className='font-normal dark:text-cyan-400'
            color='inherit'
          >
            Switch Theme
          </Typography>
        </MenuItem>
        {!isAuth ? (
          <>
            <MenuItem
              key='Sign In'
              onClick={toggleShowDialog}
              className='flex items-center gap-2 rounded dark:text-pink-400 dark:hover:bg-purple-900'
            >
              {createElement(PowerIcon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Typography
                as='span'
                variant='small'
                className='font-normal dark:text-cyan-400'
                color='inherit'
              >
                Sign In
              </Typography>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            key='Sign out'
            className='flex items-center gap-2 rounded dark:text-pink-400 dark:hover:bg-purple-900'
            onClick={async () => await signOut()}
          >
            {createElement(PowerIcon, {
              className: "h-4 w-4",
              strokeWidth: 2,
            })}
            <Typography
              as='span'
              variant='small'
              className='font-normal dark:text-cyan-400'
              color='inherit'
            >
              Sign out
            </Typography>
          </MenuItem>
        )}
      </MenuList>
      <SignInDialog open={showDialog} handler={toggleShowDialog} />
    </Menu>
  );
}

// nav list menu

// nav list component
const navListItems = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/comments", label: "Comments" },
  { href: "/admin/contact", label: "Contact" },
];

function NavList() {
  return (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center'>
      {navListItems.map(({ label, href }, key) => (
        <Typography
          key={label}
          as='a'
          href={href}
          variant='small'
          color='blue-gray'
          className='font-normal'
        >
          <MenuItem className='flex items-center gap-2 lg:rounded-full dark:text-light-blue-400'>
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className='mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 dark:bg-black dark:border-purple-700 dark:shadow-lg dark:shadow-purple-300'>
      <div className='relative mx-auto flex items-center text-blue-gray-900 dark:text-pink-600 dark:font-bold'>
        <Avatar
          variant='circular'
          size='sm'
          alt='tania andrew'
          className='border dark:border-purple-700'
          src='./penguin.png'
        />
        <Typography
          as='a'
          href='/'
          className='mr-4 ml-3 cursor-pointer py-1.5 font-medium'
        >
          Penguin Blog
        </Typography>
        <div className='absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block'>
          <NavList />
        </div>
        <IconButton
          size='sm'
          color='blue-gray'
          variant='text'
          onClick={toggleIsNavOpen}
          className='ml-auto mr-2 lg:hidden'
        >
          <Bars2Icon className='h-6 w-6' />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className='overflow-scroll'>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
