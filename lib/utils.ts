import formidable from "formidable";
import { NextApiRequest } from "next";
import Post, { PostModelSchema } from "../models/Post";
import { PostDetail } from "@/utils/type";
import dbConnect from "./dbConnect";
import { profile } from "console";
import User from "@/models/User";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        console.log("err", err);
      }
      resolve({ files, body: fields as T });
    });
  });
};

export const readPostsFromDb = async (limit: number, pageNo: number) => {
  if (!limit || limit > 10)
    throw Error("Please use limit under 10 and a valid pageNo");
  const skip = limit * pageNo;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(skip)
    .limit(limit);

  return posts;
};

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
  }));
};

export const handleUserOAuth = async (profile: any) => {
  await dbConnect();
  const oldUser = await User.findOne({ email: profile.email });
  const userProfile = {
    email: profile.email,
    name: profile.name || profile.login,
    avatar: profile.avatar_url,
    role: "user",
  };

  if (!oldUser) {
    const newUser = new User({
      ...userProfile,
      provider: "github",
    });

    await newUser.save();
  } else {
    userProfile.role = oldUser.role;
  }
  return { id: profile.id, ...userProfile };
};
