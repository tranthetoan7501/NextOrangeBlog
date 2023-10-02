// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/lib/dbConnect";
import { readFile } from "@/lib/utils";
import { validateSchema, postValidationSchema } from "@/lib/validator";
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
      await dbConnect();
      return res.status(200).json({ message: "success" });
    case "POST":
      return createNewPost(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}

async function createNewPost(req: NextApiRequest, res: NextApiResponse<any>) {
  const { files, body } = await readFile<any>(req);
  let tags = [];

  if (body.tags) tags = JSON.parse(body.tags[0] as string);
  body.title = body.title[0];
  body.content = body.content[0];
  body.meta = body.meta[0];
  body.slug = body.slug[0];
  console.log("body", body);

  const error = validateSchema(postValidationSchema, { ...body, tags });

  const message = error;
  res.json({ isSuccess: error ? false : true, message: message });
}
