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
  onCancel?(): void;
  onConfirm?(): void;
  handler: () => void;
}
export function ConfirmDialog({
  visible,
  title,
  subTitle,
  busy = false,
  onCancel,
  onConfirm,
  handler: handleOpen,
}: Props) {
  return (
    <>
      <Dialog open={visible} handler={handleOpen}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{subTitle}</DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={onCancel}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={onConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
