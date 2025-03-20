import multer from "multer";

import { v2 as cloudinaryV2 } from "cloudinary"; // Use the correct import
import fs from "fs"; // To remove local files after upload



const upload = multer({ dest: "uploads/" });

export const uploadImage = async (req, res) => {
  try {
    const uploadFiles = upload.array("images", 10);

    uploadFiles(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      try {
        const folder = "facebook_media";

        // Use Promise.all to wait for all uploads to finish
        const uploadedFiles = await Promise.all(
          files.map(async (file) => {
            const result = await cloudinaryV2.uploader.upload(file.path, {
              folder,
            });

            // Remove the file from local storage after upload
            fs.unlinkSync(file.path);

            return result.secure_url;
          })
        );

        return res.status(200).json({ images: uploadedFiles });
      } catch (uploadError) {
        return res.status(500).json({ message: "Cloudinary upload failed", error: uploadError });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
