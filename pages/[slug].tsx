import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import parse from "html-react-parser";
import AppHeader from "@/components/common/AppHeader";
import Image from "next/image";
import dateFormat from "dateformat";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function SinglePost({ post }: Props) {
  const { title, content, tags, meta, slug, thumbnail, createdAt } = post;
  return (
    <div>
      <AppHeader title={title} desc={meta} thumbnail={thumbnail} />
      <div className='pb-20 px-2 sm:px-10 xl:px-52 lg:px-32'>
        {thumbnail ? (
          <div className='relative aspect-video'>
            <Image
              src={thumbnail}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className='rounded-xl'
            />
          </div>
        ) : null}

        <h1 className='text-4xl lg:text-6xl font-semibold text-primary-dark dark:text-primary pt-5 dark:text-blue-700'>
          {title}
        </h1>

        <div className='flex items-center justify-between pb-5 text-secondary-dark dark:text-secondary-light'>
          <div className='flex text-blue-700'>
            {tags.map((t, index) => (
              <span
                className='text-blue-900 hover:text-blue-700 font-bold dark:text-purple-300 cursor-pointer dark:hover:text-cyan-300'
                key={t + index}
              >
                #{t} &nbsp;
              </span>
            ))}
          </div>

          <span className='font-normal font-roboto text-lg dark:text-pink-400'>
            {dateFormat(createdAt, "d-mmm-yyyy")}
          </span>
        </div>

        <div className='prose prose-lg dark:prose-invert max-w-5xl mx-auto'>
          {parse(content)}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select("slug");
    const paths = posts.map(({ slug }) => ({ params: { slug } }));
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [{ params: { slug: "/" } }],
      fallback: false,
    };
  }
};

interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });
    if (!post) return { notFound: true };

    const { _id, title, content, meta, slug, tags, thumbnail, createdAt } =
      post;
    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          slug,
          tags,
          thumbnail: thumbnail?.url || "",
          createdAt: createdAt.toString(),
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};
