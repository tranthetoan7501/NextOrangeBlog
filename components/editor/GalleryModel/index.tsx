import { Button, Card } from "@material-tailwind/react";
import ModalContainer, { ModalProps } from "../../common/ModalContainer";
import Gallery from "./Gallery";

interface Props extends ModalProps {}
export default function GallaryModel({ visible, onClose }: Props) {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl p-2 bg-green-100 dark:bg-primary rounded">
        <div className="flex">
          {/* gallery */}
          <div className="basis-[75%] max-h-[450px] overflow-y-auto">
            <Gallery />
          </div>
          <div className="basis-1/4"></div>
        </div>
      </div>
      {/* <Card className="bg-white p-20 text-white">
        <Button color="green">Click Me</Button>
      </Card> */}
    </ModalContainer>
  );
}
