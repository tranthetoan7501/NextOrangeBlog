// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";
import formidable from "formidable";
import { readFile } from "../../lib/utils";
export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  message?: string;
  url?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      return uploadNewImage(req, res);
    case "GET":
      return readAllImages(req, res);
    default:
      return res.status(404).send("Not found!");
  }
}

async function uploadNewImage(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  try {
    const { files } = await readFile(req);
    const imageFile = (files as any).image as formidable.File;
    const { secure_url: url } = await cloudinary.uploader.upload(
      imageFile.filepath,
      {
        folder: "dev-blogs",
      }
    );
    res.status(200).json({ url: url });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ message: error.error });
  }
}

function readAllImages(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  res.status(200).json({ message: "John Does" });
}
