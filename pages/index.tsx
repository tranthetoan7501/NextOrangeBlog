import { PostDetail } from "@/utils/type";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { formatPosts, readPostsFromDb } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import AppHeader from "@/components/common/AppHeader";
import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
import { filterPosts } from "@/utils/helper";

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
    <div className='pt-5'>
      <AppHeader />
      <InfiniteScrollPosts
        hasMore={hasMorePosts}
        next={fetchMorePosts}
        dataLength={postsToRender.length}
        posts={postsToRender}
        showControls={isAdmin}
        onPostDeleted={(post) =>
          setPostsToRender(filterPosts(postsToRender, post))
        }
      />
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
