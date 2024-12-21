import { v2 as cloudianry } from "cloudinary";
import multer from "multer";
cloudianry.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default cloudianry;

export const upload = multer({
  storage: multer.memoryStorage(),
});