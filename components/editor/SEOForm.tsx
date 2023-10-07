import { Input, Textarea } from "@material-tailwind/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import slugify from "slugify";

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
}
interface Props {
  initialValue?: SeoResult;
  title?: string;
  onChange(result: SeoResult): void;
}
export default function SEOForm({ initialValue, title = "", onChange }: Props) {
  const [values, setValues] = useState({ meta: "", slug: "", tags: "" });
  const handleChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    let { name, value } = target;
    if (name === "meta") value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    console.log(newValues);
    onChange(newValues);
  };
  useEffect(() => {
    const slug = slugify(title.toLowerCase());
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) {
      setValues({ ...initialValue, slug: slugify(initialValue.slug) });
    }
  }, [initialValue]);

  return (
    <div>
      <h3 className='block font-sans text-xl font-semibold leading-tight tracking-normal antialiased mb-4'>
        SEO Section
      </h3>
      <Input
        name='slug'
        onChange={handleChange}
        value={values.slug}
        color='green'
        label='Slug'
        crossOrigin={undefined}
      />
      <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-2' />
      <Input
        name='tags'
        onChange={handleChange}
        value={values.tags}
        color='green'
        label='Tags'
        crossOrigin={undefined}
      />
      <div className='h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-2' />
      <Textarea
        name='meta'
        onChange={handleChange}
        value={values.meta}
        color='green'
        label={"Meta description " + values.meta.length + "/150"}
      />
    </div>
  );
}
