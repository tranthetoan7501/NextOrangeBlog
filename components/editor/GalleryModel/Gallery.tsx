import { BsCardImage } from "react-icons/bs";
import Images from "./Image";

interface Props {
  images: { src: string }[] | undefined;
  uploading?: boolean;
  onSelect(index: number): void;
  selectedImage?: number;
}
export default function Gallery({
  images,
  uploading = false,
  onSelect,
  selectedImage = -1,
}: Props) {
  return (
    <div className='flex flex-wrap'>
      {uploading && (
        <div className='basis-1/4 overflow-hidden cursor-pointer pt-4 w-36 h-36 flex items-center justify-center text-black-700 rounded animate-pulse'>
          <BsCardImage size={50} className='p-2' />
          <p> Uploading</p>
        </div>
      )}
      {images &&
        images.map(({ src }, index) => {
          return (
            <div key={index} className='basis-1/4 p-0.5'>
              <Images
                alt='sdasdas'
                src={src}
                selected={selectedImage === index}
                onClick={() => onSelect(index)}
              />
            </div>
          );
        })}
    </div>
  );
}
