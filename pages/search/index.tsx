import AppHeader from "@/components/common/AppHeader";
import InfiniteScrollPosts from "@/components/common/InfiniteScrollPosts";
import { filterPosts } from "@/utils/helper";
import { PostDetail } from "@/utils/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
let pageNo = 0;
let limit = 9;
export default function Search() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const [postsToRender, setPostsToRender] = useState<PostDetail[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const isAdmin = false;

  useEffect(() => {
    if (title == null) return;
    axios(`/api/posts?limit=${limit}&pageNo=${0}&title=${title}`)
      .then(({ data }) => {
        setPostsToRender(data.posts);
      })
      .catch((err) => {
        console.log(err);
        setHasMorePosts(false);
      });
  }, [title]);

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&pageNo=${pageNo}&title=${title}`
      );

      if (postsToRender != undefined) {
        if (data.posts.length < limit) {
          setPostsToRender([...postsToRender, ...data.posts]);
          setHasMorePosts(false);
        } else setPostsToRender([...postsToRender, ...data.posts]);
      }
    } catch (error) {
      setHasMorePosts(false);
      console.log(error);
    }
  };
  return postsToRender.length == 0 ? (
    <div className='flex justify-center pt-16'>
      <div>
        <div className='h-fit'>
          <Image
            src='/notfound.png'
            width={300}
            height={300}
            alt='empty search'
          />
        </div>
        <div className='flex justify-center mt-5 text-2xl font-bold text-black dark:text-purple-300'>
          Không tìm thấy
        </div>
      </div>
    </div>
  ) : (
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
