import { BsCheckLg } from "react-icons/bs";

interface Props {
  visible: boolean;
}

export default function CheckMark({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="bg-action p-2 rounded-full  backdrop-blur-sm">
      <BsCheckLg />
    </div>
  );
}
