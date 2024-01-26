import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { CommentResponse } from "@/utils/type";
import CommentCard from "./CommentCard";

import CommentRelyGroup from "./CommentRelyGroup";
import { ConfirmDialog } from "./ConfirmDialog";
interface Props {
  belongsTo: string;
}

export default function Comments({ belongsTo }: Props) {
  const [comments, setComments] = useState<CommentResponse[]>();
  const [commentToDelete, setCommentToDelete] =
    useState<CommentResponse | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const userProFile = useAuth();

  const insertNewReplyComments = (reply: CommentResponse) => {
    if (!comments) return;
    let updatedComments = [...comments];

    const chiefCommentIndex = updatedComments.findIndex(
      ({ id }) => id === reply.repliedTo
    );
    const { replies } = updatedComments[chiefCommentIndex];
    if (replies) {
      updatedComments[chiefCommentIndex].replies = [...replies, reply];
    } else {
      updatedComments[chiefCommentIndex].replies = [reply];
    }
    setComments([...updatedComments]);
  };
  const updateDeletedComments = (deletedComment: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    if (deletedComment.chiefComment)
      newComments = newComments.filter(({ id }) => id !== deletedComment.id);
    else {
      const chiefCommentIndex = newComments.findIndex(
        ({ id }) => id === deletedComment.repliedTo
      );
      const newReplies = newComments[chiefCommentIndex].replies?.filter(
        ({ id }) => id !== deletedComment.id
      );
      newComments[chiefCommentIndex].replies = newReplies;
    }

    setComments([...newComments]);
  };

  const handleCreateComment = async (content: string) => {
    const newComment = await axios
      .post("/api/comment", { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    console.log(newComment);
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
  };
  const handleReplySubmit = (replyComment: {
    content: string;
    repliedTo: string;
  }) => {
    axios
      .post("/api/comment/add-reply", replyComment)
      .then(({ data }) => insertNewReplyComments(data.comment))
      .catch((err) => console.log(err));
  };
  const handleUpdateSubmit = (content: string, id: string) => {
    axios
      .patch(`/api/comment?commentId=${id}`, { content })
      .then(({ data }) => updateEditedComment(data.comment))
      .catch((err) => console.log(err));
  };
  const handleOnDeleteConfirm = () => {
    if (!commentToDelete) return;

    axios
      .delete(`/api/comment?commentId=${commentToDelete.id}`)
      .then(({ data }) => {
        if (data.removed) updateDeletedComments(commentToDelete);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setCommentToDelete(null);
        setShowConfirmModal(false);
      });
  };
  const handleOnLikeClick = (comment: CommentResponse) => {
    if (!userProFile) return;
    axios
      .post("/api/comment/update-like", { commentId: comment.id })
      .then(({ data }) => updateLikedComments(data.comment))
      .catch((err) => console.log(err));
  };
  const handleOnDeleteClick = (comment: CommentResponse) => {
    setCommentToDelete(comment);
    setShowConfirmModal(true);
  };
  const handleOnDeleteCancel = () => {
    setCommentToDelete(null);
    setShowConfirmModal(false);
  };
  const updateEditedComment = (newComment: CommentResponse) => {
    if (!comments) return;

    let updatedComments = [...comments];

    // To update the we can only change the content
    // if edited comment is chief
    if (newComment.chiefComment) {
      const index = updatedComments.findIndex(({ id }) => id === newComment.id);
      updatedComments[index].content = newComment.content;
    }
    // otherwise updating comment from replies
    else {
      const chiefCommentIndex = updatedComments.findIndex(
        ({ id }) => id === newComment.repliedTo
      );

      let newReplies = updatedComments[chiefCommentIndex].replies;
      newReplies = newReplies?.map((comment) => {
        if (comment.id === newComment.id) comment.content = newComment.content;
        return comment;
      });

      updatedComments[chiefCommentIndex].replies = newReplies;
    }

    setComments([...updatedComments]);
  };
  const updateLikedComments = (likedComment: CommentResponse) => {
    if (!comments) return;
    let newComments = [...comments];

    if (likedComment.chiefComment)
      newComments = newComments.map((comment) => {
        if (comment.id === likedComment.id) return likedComment;
        return comment;
      });
    else {
      const chiefCommentIndex = newComments.findIndex(
        ({ id }) => id === likedComment.repliedTo
      );
      const newReplies = newComments[chiefCommentIndex].replies?.map(
        (reply) => {
          if (reply.id === likedComment.id) return likedComment;
          return reply;
        }
      );
      newComments[chiefCommentIndex].replies = newReplies;
    }

    setComments([...newComments]);
  };

  useEffect(() => {
    axios(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, [belongsTo]);
  return (
    <div>
      <div className='text-3xl font-bold pt-16 pb-14 dark:text-white'>
        Comments:{" "}
      </div>
      <div className='overflow-auto comment-box'>
        {comments?.map((comment) => (
          <div key={comment.id} className='py-2'>
            <CommentCard
              key={comment.id}
              comment={comment}
              onReplySubmit={(content) =>
                handleReplySubmit({ content, repliedTo: comment.id })
              }
              onUpdateSubmit={(content) =>
                handleUpdateSubmit(content, comment.id)
              }
              onDeleteClick={() => handleOnDeleteClick(comment)}
              onLikeClick={() => handleOnLikeClick(comment)}
            />
            <CommentRelyGroup
              comment={comment}
              userProFile={userProFile}
              handleReplySubmit={handleReplySubmit}
              handleUpdateSubmit={handleUpdateSubmit}
              handleOnDeleteClick={handleOnDeleteClick}
              handleOnLikeClick={handleOnLikeClick}
            />
          </div>
        ))}
      </div>

      {userProFile ? (
        <CommentForm onSubmit={handleCreateComment} />
      ) : (
        <div className='mt-5'>
          <span className='text-2xl dark:text-gray-300'>
            Đăng nhập để bình luận
          </span>
        </div>
      )}
      <ConfirmDialog
        visible={showConfirmModal}
        title='Xác nhận xóa bình luận'
        subTitle='Bạn có chắc chắn muốn xóa bình luận này?'
        onConfirm={handleOnDeleteConfirm}
        onCancel={handleOnDeleteCancel}
      />
    </div>
  );
}
