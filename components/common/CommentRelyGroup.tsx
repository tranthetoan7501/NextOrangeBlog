import { CommentResponse, UserProfile } from "@/utils/type";
import React, { useState } from "react";
import CommentCard from "./CommentCard";

interface Props {
  comment: CommentResponse | undefined;
  userProFile: UserProfile | undefined;
  showControls?: boolean;
  onUpdateSubmit?(content: string): void;
  handleReplySubmit?(replyComment: {
    content: string;
    repliedTo: string;
  }): void;
  onDeleteClick?(): void;
  onLikeClick?(): void;
}
export default function CommentRelyGroup({
  comment,
  userProFile,
  showControls,
  onUpdateSubmit,
  handleReplySubmit,
  onDeleteClick,
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
                />
              );
            })}
        </div>
      ) : null}
    </div>
  );
}
