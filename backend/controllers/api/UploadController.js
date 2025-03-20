import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary (should be at the top level)

// Use memory storage for serverless environments
const upload = multer({ storage: multer.memoryStorage() }).array("images", 10);

export const uploadImage = async (req, res) => {
  try {
    // Process file upload
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Upload to Cloudinary
    const uploadedUrls = await Promise.all(
      req.files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
              folder: "facebook_media",
              resource_type: "auto",
            }
          );
          return result.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          throw new Error("Failed to upload file to Cloudinary");
        }
      })
    );

    return res.status(200).json({ images: uploadedUrls });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      message: error.message,
      code: error.code || "SERVER_ERROR",
    });
  }
};