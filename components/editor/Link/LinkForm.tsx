import { Card, Input, Checkbox } from "@material-tailwind/react";

interface Props {
  visible: boolean;
  onSubmit(link: linkOption): void;
  initialState?: linkOption;
}
export type linkOption = {
  url: string;
  openInNewTab: boolean;
};

const defaultLink = {
  url: "",
  openInNewTab: false,
};

export default function LinkForm({ visible, initialState, onSubmit }: Props) {
  if (!visible) return null;
  return (
    <Card className='mt-1 w-60 p-3'>
      <Input label='Link' crossOrigin={undefined} />
      <Checkbox
        color='green'
        label='Open new tab'
        defaultChecked
        crossOrigin={undefined}
      />
    </Card>
  );
}
