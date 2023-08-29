import { Select, Option } from "@material-tailwind/react";
import { getFocusedEditor } from "../utils/EditorUtils";
import { ReactNode } from "react";

interface Props {
  name: string;
  options: { label: string; onClick(): void }[];
}
export function DropDown({ options, name }: Props) {
  return (
    <div className='flex w-72 flex-col gap-6'>
      <Select size='lg' label={name}>
        {options.map((option) => (
          <Option key={option.label} onClick={option.onClick}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}
