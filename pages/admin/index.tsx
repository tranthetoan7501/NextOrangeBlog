import { PostDetail } from "@/utils/type";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { formatPosts, readPostsFromDb } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import AppHeader from "@/components/common/AppHeader";
import { filterPosts } from "@/utils/helper";
import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Admin({ posts }: Props) {
  const [postsToRender, setPostsToRender] = useState(posts);

  const [hasMorePosts, setHasMorePosts] = useState(true);
  const removePost = (post: PostDetail) => {
    setPostsToRender(filterPosts(postsToRender, post));
  };
  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&pageNo=${pageNo}`
      );
      console.log(data.posts);
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
    <div>
      <AppHeader title='Home' />
      <InfiniteScrollPosts
        hasMore={hasMorePosts}
        next={fetchMorePosts}
        dataLength={postsToRender.length}
        posts={postsToRender}
        showControls
        onPostDeleted={removePost}
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
