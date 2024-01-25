import ModalContainer, { ModalProps } from "../../common/ModalContainer";
import Gallery from "./Gallery";
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import Image from "next/image";
import ActionButton from "@/components/common/ActionButton";
import { AiOutlineCloudUpload } from "react-icons/ai";

export interface ImageSelectionResult {
  src: string;
  altText: string;
}
interface Props extends ModalProps {
  images?: { src: string }[] | undefined;
  uploading?: boolean;
  onFileSelect(image: File): void;
  onSelect(result: ImageSelectionResult): void;
}

export default function GallaryModel({
  visible,
  uploading,
  images,
  onFileSelect,
  onClose,
  onSelect,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(-1);
  const [altText, setAltText] = useState("");
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);
  const handleOnImageChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    if (!files) return;
    const file = files[0];
    if (!file.type.startsWith("image")) return handleClose();
    onFileSelect(file);
  };
  const handleSelection = () => {
    if (selectedImage < 0 || !images) return handleClose();
    onSelect({ src: images[selectedImage].src, altText });
    handleClose();
    setAltText("");
    setSelectedImage(-1);
  };
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className='max-w-4xl p-2 border-2 border-purple-500 bg-white dark:bg-black rounded '>
        <div className='flex'>
          {/* gallery */}
          <div className='basis-[83%] max-h-[450px] overflow-y-auto '>
            <Gallery
              images={images}
              selectedImage={selectedImage}
              uploading={uploading}
              onSelect={(index) => setSelectedImage(index)}
            />
          </div>
          <div className='basis-1/4'>
            <div className='pl-1 py-1'>
              <div>
                <input
                  onChange={handleOnImageChange}
                  hidden
                  type='file'
                  id='image-input'
                />
                <label htmlFor='image-input'>
                  <div className='w-full border-2 hover:text-lg  border-blue-500 h-12 text-cyan-700 flex items-center justify-center space-x-2 pt-1 cursor-pointer rounded'>
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
            </div>
            {selectedImage != -1 && images ? (
              <>
                <div className='relative aspect-video'>
                  <Image
                    className='pl-1'
                    alt='selected image'
                    src={images[selectedImage].src}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
                <div className='pl-1 pt-1'>
                  <textarea
                    className='border-2 border-orange-500 mr-4 w-full h-24 px-2'
                    placeholder='Input here'
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>
                </div>

                <div className='pl-1 pt-1'>
                  <ActionButton
                    busy
                    title='Select'
                    onClick={handleSelection}
                  ></ActionButton>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
