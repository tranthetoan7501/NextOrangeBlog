import { MouseEventHandler } from "react";
import { BiLoader } from "react-icons/bi";
import { Button } from "@material-tailwind/react";

interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function ActionButton({
  disabled,
  busy = false,
  title,
  onClick,
}: Props) {
  return (
    <Button
      color="green"
      className="px-6 py-2 font-semibold hover:scale-[0.97] duration-100  w-full flex items-center justify-center space-x-2 transition"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {busy && <BiLoader className="animate-spin ml-2" size={20} />}
    </Button>
  );
}
