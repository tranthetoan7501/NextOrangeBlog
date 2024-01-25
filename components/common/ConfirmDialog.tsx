import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ModalProps } from "./ModalContainer";

interface Props extends ModalProps {
  visible: boolean;
  title: string;
  subTitle: string;
  busy?: boolean;
  onConfirm(): void;
  onCancel: () => void;
}
export function ConfirmDialog({
  visible,
  title,
  subTitle,
  busy = false,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <>
      <Dialog
        open={visible}
        handler={onCancel}
        className='border border-purple-500 dark:bg-black bg-white'
      >
        <DialogHeader className='text-blue-800'>{title}</DialogHeader>
        <DialogBody className='text-gray-700 dark:text-gray-300'>
          {subTitle}
        </DialogBody>
        <DialogFooter>
          <Button
            variant='gradient'
            color='blue'
            onClick={onCancel}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant='gradient'
            color='red'
            className='ml-3'
            onClick={onConfirm}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
