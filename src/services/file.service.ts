import { v2 as cloudinary } from "cloudinary";
import envConfig from "../configs/env.config";

cloudinary.config({
  cloud_name: envConfig.CloudinaryCloudName,
  api_key: envConfig.CloudinaryApiKey,
  api_secret: envConfig.CloudinaryApiSecret,
});

export const uploadFile = async (
  file: string
): Promise<{ url: string; path: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        access_mode: "public",
        folder: "assets/profile",
      },
      (err, result) => {
        if (err) reject(err);
        if (result)
          resolve({
            url: result.url,
            path: result?.public_id,
          });
      }
    );
  });
};
export const deleteFile = async (path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      path,
      {
        invalidate: true,
      },
      (err, result) => {
        if (err) reject(err);
        if (result) resolve(true);
      }
    );
  });
};
