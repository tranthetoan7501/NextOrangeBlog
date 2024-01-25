import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { CommentResponse } from "@/utils/type";
import CommentCard from "./CommentCard";

import CommentRelyGroup from "./CommentRelyGroup";
interface Props {
  belongsTo: string;
}

export default function Comments({ belongsTo }: Props) {
  const [comments, setComments] = useState<CommentResponse[]>();
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
      {/* <CommentCardGroup
        comments={comments}
        userProFile={userProFile}
        handleReplySubmit={handleReplySubmit}
      /> */}
      <div className='overflow-auto comment-box'>
        {comments?.map((comment) => (
          <div key={comment.id} className='py-2'>
            <CommentCard
              key={comment.id}
              comment={comment}
              onReplySubmit={(content) =>
                handleReplySubmit({ content, repliedTo: comment.id })
              }
            />
            <CommentRelyGroup
              comment={comment}
              userProFile={userProFile}
              handleReplySubmit={handleReplySubmit}
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
    </div>
  );
}
