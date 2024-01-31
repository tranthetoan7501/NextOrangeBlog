import dbConnect from "@/lib/dbConnect";
import { formatComment, isAdmin, isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { isValidObjectId } from "mongoose";
import { LatestComment } from "@/utils/type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return readLatestComments(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}

async function readLatestComments(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Unauthorized user!" });

  const limit = 5;

  const comments = await Comment.find({ chiefComment: true })
    .populate("owner")
    .limit(limit)
    .sort("-createdAt")
    .populate({
      path: "belongsTo",
      select: "title slug",
    });

  const latestComments: LatestComment[] = comments.map((comment: any) => ({
    id: comment._id,
    content: comment.content,
    owner: {
      id: comment.owner._id,
      name: comment.owner.name,
      avatar: comment.owner.avatar,
    },
    belongsTo: {
      id: comment.belongsTo._id,
      title: comment.belongsTo.title,
      slug: comment.belongsTo.slug,
    },
  }));

  res.json({ comments: latestComments });
}
