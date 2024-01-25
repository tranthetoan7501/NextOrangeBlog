import { CommentResponse, UserProfile } from "@/utils/type";
import React, { useState } from "react";
import CommentCard from "./CommentCard";

interface Props {
  comment: CommentResponse | undefined;
  userProFile: UserProfile | undefined;
  showControls?: boolean;
  handleReplySubmit?(replyComment: {
    content: string;
    repliedTo: string;
  }): void;
  handleUpdateSubmit?(content: string, id: string): void;
  handleOnDeleteClick?(comment: CommentResponse): void;
  onDeleteClick?(): void;
  onLikeClick?(): void;
}
export default function CommentRelyGroup({
  comment,
  userProFile,
  showControls,
  handleUpdateSubmit,
  handleReplySubmit,
  handleOnDeleteClick,
}: Props) {
  const [displayReplyBox, setDisplayReplyBox] = useState(false);
  return (
    <div>
      {comment?.replies?.length ? (
        <div className='w-[93%] ml-auto pt-1'>
          {!displayReplyBox && (
            <span
              className='hover:underline cursor-pointer dark:text-gray-400 pt-2 hover:text-blue-500 dark:hover:text-blue-300'
              onClick={() => {
                setDisplayReplyBox(true);
              }}
            >
              {comment.replies.length} phản hồi
            </span>
          )}
          {displayReplyBox &&
            comment.replies.map((reply) => {
              return (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  showControls={userProFile?.id === reply.owner.id}
                  onReplySubmit={(content) =>
                    handleReplySubmit &&
                    handleReplySubmit({
                      content,
                      repliedTo: comment.id,
                    })
                  }
                  onUpdateSubmit={(content) =>
                    handleUpdateSubmit &&
                    handleUpdateSubmit(content, comment.id)
                  }
                  onDeleteClick={() =>
                    handleOnDeleteClick && handleOnDeleteClick(comment)
                  }
                />
              );
            })}
        </div>
      ) : null}
    </div>
  );
}
