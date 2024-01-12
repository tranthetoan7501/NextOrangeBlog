import cloudinary from "@/lib/cloudinary";
import { isAdmin, readFile } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import { NextApiRequest, NextApiResponse } from "next";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handlerUpdate(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    case "PATCH":
      return updatePost(req, res);
    case "DELETE":
      return deletePost(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}
interface IncomingPost {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string;
}

async function deletePost(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const admin = await isAdmin(req, res);
    if (!admin) return res.status(401).json({ error: "unauthorized request!" });

    const postId = req.query.postId as string;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: "Post not found!" });

    // remove thumbnail from post
    const publicId = post.thumbnail?.public_id;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    res.json({ removed: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePost(req: NextApiRequest, res: NextApiResponse<any>) {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(401).json({ error: "unauthorized request!" });
  const postId = req.query.postId as string;
  console.log("postId", postId);
  const post = await Post.findById(postId);

  if (!post) return res.status(404).json({ error: "Post not found!" });

  const { files, body } = await readFile<any>(req);

  let tags;
  if (body.tags) tags = JSON.parse(body.tags[0] as string);
  const title = body.title[0];
  const content = body.content[0];
  const meta = body.meta[0];
  const slug = body.slug[0];

  const error = validateSchema(postValidationSchema, {
    title,
    content,
    meta,
    slug,
    tags,
  });
  if (error) return res.status(400).json({ error: error });
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  if (files.thumbnail) {
    const thumbnail = files.thumbnail[0];
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "orange-blogs",
      }
    );
    const publicId = post.thumbnail?.public_id;
    if (publicId) await cloudinary.uploader.destroy(publicId);

    post.thumbnail = { url, public_id };
  }
  await post.save();
  res.json({ post, isSuccess: true });
}
