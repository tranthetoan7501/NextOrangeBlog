import Head from "next/head";
interface Props {
  title?: string;
  desc?: string;
  thumbnail?: string;
}
export const APP_NAME = "PenguinBlog";
export default function AppHeader({ title, desc, thumbnail }: Props) {
  return (
    <Head>
      <title>{title ? title + " | " + APP_NAME : APP_NAME}</title>
      {/* <meta
        property='og:image'
        content={
          thumbnail
            ? thumbnail
            : "https://res.cloudinary.com/dcojxsjnw/image/upload/v1697211448/orange-blogs/akp21fjovqdagupbw60z.png"
        }
      /> */}
      <meta content={desc} name='description' />
    </Head>
  );
}
