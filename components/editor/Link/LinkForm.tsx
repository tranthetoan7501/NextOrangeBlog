import { Card, Input, Checkbox, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { validateUrl } from "../EditorUtils";

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
  const [link, setLink] = useState<linkOption>(defaultLink);

  const handleSubmit = () => {
    onSubmit({ ...link, url: validateUrl(link.url) });
    resetForm();
  };

  const resetForm = () => {
    setLink({ ...defaultLink });
  };

  useEffect(() => {
    if (initialState) setLink({ ...initialState });
  }, [initialState]);

  if (!visible) return null;
  return (
    <Card className="mt-1 w-60 p-3">
      <Input
        label="Link"
        crossOrigin={undefined}
        value={link.url}
        onChange={({ target }) => setLink({ ...link, url: target.value })}
      />
      <Checkbox
        color="green"
        label="Open new tab"
        checked={link.openInNewTab}
        onChange={({ target }) =>
          setLink({ ...link, openInNewTab: target.checked })
        }
        crossOrigin={undefined}
      />
      <Button onClick={handleSubmit} color="green">
        Apply
      </Button>
    </Card>
  );
}
