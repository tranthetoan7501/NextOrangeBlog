import { FC } from "react";
import CheckMark from "../../common/CheckMark";
import Image from "next/image";

interface Props {
  alt: string;
  src: string;
  selected?: boolean;
  onClick?(): void;
}

export default function Images({ src, alt, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="relative rounded overflow-hidden cursor-pointer w-40 h-40"
    >
      <Image
        src={src}
        alt={alt ? alt : "gallery"}
        objectFit="cover"
        fill={true}
        className="bg-secondary-light hover:scale-110 transition"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
}
