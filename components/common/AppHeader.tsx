import Head from "next/head";
interface Props {
  title?: string;
  desc?: string;
  thumbnail?: string;
}
export const APP_NAME = "HeyTellme Blog";
export default function AppHeader({ title, desc, thumbnail }: Props) {
  return (
    <Head>
      <title>{title ? title + " | " + APP_NAME : APP_NAME}</title>
      {thumbnail && (
        <meta
          property='og:image'
          content={thumbnail ? thumbnail : "/penguin.png"}
        />
      )}
      <meta
        name='keywords'
        content='Heytellme, Hey tell me,Heytellme blog, Hey tell me blog'
      ></meta>
      <meta
        name='description'
        property='description'
        content={
          desc
            ? desc
            : "HeyTellme Blog - trang blog của một sinh viên khô khan,Hey! Tell me hãy kể câu chuyện của bạn, biết đâu nó giống câu chuyện của tôi"
        }
      />
      <meta name='robots' content='index, follow'></meta>
    </Head>
  );
}
