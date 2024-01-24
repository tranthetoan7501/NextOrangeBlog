import { BsYoutube } from "react-icons/bs";

import { useEffect, useRef, useState } from "react";
import Button from "./ToolBar/Button";
import { Card, Input, Button as TButton } from "@material-tailwind/react";
interface Props {
  onSubmit(link: any): void;
}

export default function InsertLink({ onSubmit }: Props) {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url.trim()) return setVisible(false);
    onSubmit(url);
    setUrl("");
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
        if (event.key === "Escape") setVisible(false);
      }}
      className='relative'
    >
      <Button onClick={toggleDropdown}>
        <BsYoutube />
      </Button>
      {visible && (
        <div className='absolute top-12 -right-28 mt-4 z-50'>
          <Card className='mt-1 w-60 p-3'>
            <Input
              label='Link Youtube'
              crossOrigin={undefined}
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />

            <TButton className='mt-2' onClick={handleSubmit} color='green'>
              Apply
            </TButton>
          </Card>
        </div>
      )}
    </div>
  );
}
