import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { CommentResponse } from "@/utils/type";
import CommentCard from "./CommentCard";
interface Props {
  belongsTo: string;
}

export default function Comments({ belongsTo }: Props) {
  const [comments, setComments] = useState<CommentResponse[]>();
  const userProFile = useAuth();
  const handleCreateComment = async (content: string) => {
    const newComment = await axios
      .post("/api/comment", { content, belongsTo })
      .then(({ data }) => data.comment)
      .catch((err) => console.log(err));
    console.log(newComment);
    if (newComment && comments) setComments([...comments, newComment]);
    else setComments([newComment]);
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
        Bình luận gì nè :{" "}
      </div>
      <div className='overflow-auto comment-box'>
        {comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      {userProFile ? (
        <CommentForm onSubmit={handleCreateComment} />
      ) : (
        <Button color='blue'>Login to comment</Button>
      )}
    </div>
  );
}
