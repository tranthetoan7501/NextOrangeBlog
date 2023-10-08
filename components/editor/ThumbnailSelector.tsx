import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  initialValue?: string;
  onChange(file: File): void;
}

export function ThumbnailSelector({ initialValue, onChange }: Props) {
  const [selectedThumbnail, setSelectedThumbnail] = useState("");
  const handleChange = ({ target }: { target: HTMLInputElement }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    var binaryData = [];
    binaryData.push(file);
    setSelectedThumbnail(
      URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
    );
    onChange(file);
  };
  useEffect(() => {
    if (typeof initialValue === "string") setSelectedThumbnail(initialValue);
  }, [initialValue]);
  return (
    <div className='w-32 ml-1'>
      <input
        hidden
        aria-hidden='true'
        aria-label='thumbnail'
        type='file'
        accept='image/jpg, image/png, image/jpeg'
        id='thumbnail'
        onChange={handleChange}
      />
      <label htmlFor='thumbnail'>
        {selectedThumbnail ? (
          <Image
            width={200}
            height={200}
            src={selectedThumbnail}
            alt=''
            className='border border-dashed border-secondary-dark flex items-center justify-center rounded cursor-pointer aspect-video object-cover'
          />
        ) : (
          <PosterUI label='Thumbnail' />
        )}
      </label>
    </div>
  );
}

function PosterUI({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={
        "border border-dashed border-green-500 flex items-center justify-center rounded cursor-pointer aspect-video " +
        className
      }
    >
      <span>{label}</span>
    </div>
  );
}
