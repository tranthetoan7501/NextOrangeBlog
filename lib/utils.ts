import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import Post, { PostModelSchema } from "../models/Post";
import { CommentResponse, PostDetail, UserProfile } from "@/utils/type";
import dbConnect from "./dbConnect";
import { getServerSession } from "next-auth";
import authOptions from "../pages/api/auth/[...nextauth]";
import User from "@/models/User";
import { IComment } from "@/models/Comment";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}
interface SessionInfo {
  user: UserProfile;
  expires: string;
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
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
  }));
};

const getLikedByOwner = (likes: any[], user: UserProfile) =>
  likes.includes(user.id);

export const formatComment = (
  comment: IComment,
  user?: UserProfile
): CommentResponse => {
  const owner = comment.owner as any;
  return {
    id: comment._id.toString(),
    content: comment.content,
    likes: comment.likes.length,
    chiefComment: comment?.chiefComment || false,
    createdAt: comment.createdAt?.toString(),
    owner: { id: owner._id, name: owner.name, avatar: owner.avatar },
    repliedTo: comment?.repliedTo?.toString(),
    likedByOwner: user ? getLikedByOwner(comment.likes, user) : false,
  };
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

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: SessionInfo | null = await getServerSession(
    req,
    res,
    authOptions
  );
  await dbConnect();
  const user = await User.findOne({ email: session?.user.email });
  console.log("session?.user", user);
  return user && user.role === "admin";
};

export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: SessionInfo | null = await getServerSession(
    req,
    res,
    authOptions
  );
  await dbConnect();
  const user = await User.findOne({ email: session?.user.email });
  if (user) return user as UserProfile;
};
