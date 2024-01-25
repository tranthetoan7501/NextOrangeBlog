import { FC, ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostDetail } from "../../utils/type";
import { PostCard } from "./PostCard";
import axios from "axios";
import { ConfirmDialog } from "./ConfirmDialog";

interface Props {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next(): void;
  dataLength: number;
  loader?: ReactNode;
  onPostDeleted(post: PostDetail): void;
}
export default function InfiniteScrollPosts({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  onPostDeleted,
}: Props) {
  const defaultLoader = (
    <p className='p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse'>
      Loading....
    </p>
  );
  const [removing, setRemoving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);

  const handleOnDeleteClick = (post: PostDetail) => {
    setPostToRemove(post);
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };
  const handleOnDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();
    console.log(`/api/posts/${postToRemove.id}`);

    setShowConfirmModal(false);
    setRemoving(true);

    const {
      data,
    }: any = async () => {
      return await axios.delete(`/api/posts/${postToRemove.id}`);
    };
    console.log(data);

    if (data.removed) {
      console.log(onPostDeleted);
      onPostDeleted(postToRemove);
    }

    setRemoving(false);
  };

  return (
    <>
      <InfiniteScroll
        hasMore={hasMore}
        next={next}
        dataLength={dataLength}
        loader={loader || defaultLoader}
        className='grid grid-cols-1 xl:grid-cols-2 sm:px-7 2xl:grid-cols-3 pb-10  gap-12 top-3 place-items-center bg-transparent'
      >
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            controls={showControls}
            onDeleteClick={() => handleOnDeleteClick(post)}
            busy={post.id === postToRemove?.id && removing}
          />
        ))}
      </InfiniteScroll>

      <ConfirmDialog
        visible={showConfirmModal}
        onCancel={handleDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
        title='Are you sure?'
        subTitle='This action will remove this post permanently!'
      />
    </>
  );
}
