import Image from "./Image";
const images = [
  {
    id: 1,
    src: "/temp.jpg",
    alt: "Hình ảnh 1",
  },
  {
    id: 2,
    src: "/temp.jpg",
    alt: "Hình ảnh 2",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },
  {
    id: 3,
    src: "/temp.jpg",
    alt: "Hình ảnh 3",
  },

  // Thêm các đối tượng hình ảnh khác nếu cần
];
interface Props {
  images: { src: string }[];
  onSelect(src: string): void;
  uploading?: boolean;
  selectedImage?: string;
}
export default function Gallery() {
  return (
    <div className="flex flex-wrap">
      {images.map(({ src, alt }, index) => {
        return (
          <div key={index} className="basis-1/4 p-0.5">
            <Image
              src={src}
              selected={true}
              //   onClick={() => onselect(src)}
            />
          </div>
        );
      })}
    </div>
  );
}
