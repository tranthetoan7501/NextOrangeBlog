import dbConnect from "@/lib/dbConnect";
import { formatComment, isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { isValidObjectId } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return addReplyToComment(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}

async function addReplyToComment(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const user = await isAuth(req, res);
  if (!user) return res.status(403).json({ error: "unauthorized request!" });

  const error = validateSchema(commentValidationSchema, req.body);
  if (error) return res.status(422).json({ error });

  const { repliedTo } = req.body;
  if (!isValidObjectId(repliedTo))
    return res.status(422).json({ error: "Invalid comment id!" });

  await dbConnect();

  const chiefComment = await Comment.findOne({
    _id: repliedTo,
    chiefComment: true,
  });
  if (!chiefComment)
    return res.status(404).json({ error: "Comment not found!" });

  const replyComment = new Comment({
    owner: user.id,
    repliedTo,
    content: req.body.content,
  });

  if (chiefComment.replies)
    chiefComment.replies = [...chiefComment.replies, replyComment._id];

  await chiefComment.save();
  await replyComment.save();

  const finalComment = await replyComment.populate("owner");

  res.status(201).json({ comment: formatComment(finalComment, user) });
}
