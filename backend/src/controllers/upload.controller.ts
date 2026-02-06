import { v2 as cloudinary } from "cloudinary";
import type { Request, Response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getSignature = (request: Request, response: Response) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "timeflow_events" },
    process.env.CLOUDINARY_API_SECRET!
  );
  console.log(
    signature,
    timestamp,
    process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_NAME
  );

  return response.status(200).json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_NAME,
  });
};
