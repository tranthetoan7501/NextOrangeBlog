import Head from "next/head";
interface Props {
  title?: string;
  desc?: string;
  thumbnail?: string;
}
export const APP_NAME = "HeyTellme";
export default function AppHeader({ title, desc, thumbnail }: Props) {
  return (
    <Head>
      <title>{title ? title + " | " + APP_NAME : APP_NAME}</title>
      {thumbnail && <meta property='og:image' content={thumbnail} />}
      <meta name='description' content={desc} />
      <meta name='robots' content='index, follow'></meta>
    </Head>
  );
}
