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
      {thumbnail && <meta property='og:image' content={thumbnail} />}
      <meta content={desc} name='description' />
    </Head>
  );
}
