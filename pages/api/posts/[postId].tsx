import cloudinary from "@/lib/cloudinary";
import { readFile } from "@/lib/utils";
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

async function updatePost(req: NextApiRequest, res: NextApiResponse<any>) {
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
  if (error) return res.status(400).json({ message: error });
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
  res.json({ post });
}
