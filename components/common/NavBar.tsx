import React, { createElement, use, useState } from "react";
import Image from "next/image";
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
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import SignInDialog from "./SignInDialog";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
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
            src='https://res.cloudinary.com/dcojxsjnw/image/upload/v1677254126/4e984a4f23b46ed4ec342a7614b1364a2b2f7e4d.jpg'
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-1'>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className='flex items-center gap-2 rounded'
            >
              {createElement(icon, {
                className: "h-4 w-4",
                strokeWidth: 2,
              })}
              <Typography
                as='span'
                variant='small'
                className='font-normal'
                color='inherit'
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
        <>
          <MenuItem
            key='Sign In'
            onClick={toggleShowDialog}
            className='flex items-center gap-2 rounded'
          >
            {createElement(PowerIcon, {
              className: "h-4 w-4",
              strokeWidth: 2,
            })}
            <Typography
              as='span'
              variant='small'
              className='font-normal'
              color='inherit'
            >
              Sign In
            </Typography>
          </MenuItem>
        </>
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
          <MenuItem className='flex items-center gap-2 lg:rounded-full'>
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
    <Navbar className='mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6'>
      <div className='relative mx-auto flex items-center text-blue-gray-900'>
        <Avatar
          variant='circular'
          size='sm'
          alt='tania andrew'
          className='border '
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
