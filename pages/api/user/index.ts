import dbConnect from "@/lib/dbConnect";
import { formatComment, isAdmin, isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import { NextApiRequest, NextApiResponse } from "next";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { isValidObjectId } from "mongoose";
import { LatestComment, LatestUserProfile } from "@/utils/type";
import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      return getLatestUsers(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}

async function getLatestUsers(req: NextApiRequest, res: NextApiResponse<any>) {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(403).json({ error: "Unauthorized request!" });

  const { pageNo = "0", limit = "5" } = req.query as {
    pageNo: string;
    limit: string;
  };

  const results = await User.find({ role: "user" })
    .sort({ createdAt: "desc" })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit))
    .select("name email avatar provider");

  const users: LatestUserProfile[] = results.map(
    ({ _id, name, email, avatar, provider }) => ({
      id: _id.toString(),
      name,
      avatar,
      provider,
      email,
    })
  );

  res.json({ users });
}
