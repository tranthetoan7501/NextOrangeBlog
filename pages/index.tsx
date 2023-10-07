import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Carousel, Typography } from "@material-tailwind/react";
import { PostDetail } from "@/utils/type";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { formatPosts, readPostsFromDb } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { PostCard } from "@/components/common/PostCard";
import AppHeader from "@/components/common/AppHeader";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home({ posts }: Props) {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const isAdmin = false;
  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&pageNo=${pageNo}`
      );
      if (data.posts.length < limit) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else setPostsToRender([...postsToRender, ...data.posts]);
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-12 top-3 place-items-center'>
      <AppHeader title='Home' />
      {postsToRender.map((post) => (
        <PostCard
          key={post.slug}
          post={post}
          controls={isAdmin}
          onDeleteClick={async () => {
            try {
              await axios.delete("/api/posts/" + post.slug);
              setPostsToRender(
                postsToRender.filter((p) => p.slug !== post.slug)
              );
            } catch (error) {
              console.log(error);
            }
          }}
        />
      ))}
    </div>
  );
}

interface ServerSideResponse {
  posts: PostDetail[];
}

let pageNo = 0;
const limit = 9;

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async () => {
  try {
    // read posts
    const posts = await readPostsFromDb(limit, pageNo);
    // format posts
    const formattedPosts = formatPosts(posts);
    return {
      props: {
        posts: formattedPosts,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
