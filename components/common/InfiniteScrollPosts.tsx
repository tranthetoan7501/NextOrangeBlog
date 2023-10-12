import { FC, ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDetail } from "../../utils/type";
import { PostCard } from "./PostCard";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
}

const InfiniteScrollPosts: FC<Props> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
}): JSX.Element => {
  const defaultLoader = (
    <p className='p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse'>
      Loading...
    </p>
  );

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={next}
      dataLength={dataLength}
      loader={loader || defaultLoader}
      className='grid grid-cols-1 xl:grid-cols-2 sm:px-7 2xl:grid-cols-3 pb-10  gap-12 top-3 place-items-center bg-transparent'
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} controls={showControls} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollPosts;
