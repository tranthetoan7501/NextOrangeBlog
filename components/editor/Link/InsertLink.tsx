import { BsLink45Deg } from "react-icons/bs";
import Button from "../ToolBar/Button";
import LinkForm, { linkOption } from "./LinkForm";
import { useEffect, useRef, useState } from "react";
interface Props {
  onSubmit(link: linkOption): void;
}

export default function InsertLink({ onSubmit }: Props) {
  const [visible, setVisible] = useState(false);
  const handleSubmit = (link: linkOption) => {
    if (!link.url.trim()) return setVisible(false);

    onSubmit(link);
    setVisible(false);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null); // Specify the type

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      tabIndex={0}
      ref={dropdownRef}
      onKeyDown={(event) => {
        console.log("áđâsđá");
        if (event.key === "Escape") setVisible(false);
      }}
      className='relative'
    >
      <Button onClick={toggleDropdown}>
        <BsLink45Deg />
      </Button>
      <div className='absolute top-12 -right-28 mt-4 z-50'>
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
