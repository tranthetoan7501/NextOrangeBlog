// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { formatPosts, readFile, readPostsFromDb } from "@/lib/utils";
import { validateSchema, postValidationSchema } from "@/lib/validator";
import Post from "@/models/Post";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    // case "POST":
    //   return uploadNewImage(req, res);
    case "GET":
      return readPosts(req, res);
    case "POST":
      return createNewPost(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}

async function createNewPost(req: NextApiRequest, res: NextApiResponse<any>) {
  const { files, body } = await readFile<any>(req);
  console.log("body", body);
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
  await dbConnect();

  const alreadyExits = await Post.findOne({ slug });
  if (alreadyExits)
    return res.status(400).json({ error: "Slug need to be unique!" });

  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  if (files.thumbnail) {
    const thumbnail = files.thumbnail[0];
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "orange-blogs",
      }
    );
    newPost.thumbnail = { url, public_id };
  }

  await newPost.save();
  res.json({ post: newPost, isSuccess: true });
}

async function readPosts(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { limit, pageNo } = req.query as { limit: string; pageNo: string };
    const posts = await readPostsFromDb(parseInt(limit), parseInt(pageNo));
    res.json({ posts: formatPosts(posts) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
