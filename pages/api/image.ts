// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";
import { readFile } from "../../lib/utils";
export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  message?: string;
  src?: string;
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
    if (files.image) {
      const imageFile = files.image[0];

      const { secure_url: url } = await cloudinary.uploader.upload(
        imageFile.filepath,
        {
          folder: "orange-blogs",
        }
      );
      res.status(200).json({ src: url });
    } else {
      throw new Error("file is null");
    }
  } catch (error: any) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: error.error ? error.error : error.message });
  }
}

async function readAllImages(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { resources } = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      prefix: "orange-blogs",
    });

    const images = resources.map(({ secure_url }: any) => ({
      src: secure_url,
    }));
    res.json({ images });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
