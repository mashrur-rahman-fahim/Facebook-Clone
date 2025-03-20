import Post from "../../models/Post.js";
import User from "../../models/User.js";

export const createPost = async (req, res) => {
    const { body, photos = [], videos = [] } = req.body;
   

    const userEmail = req.email;
    if (!userEmail) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ email: userEmail }).select('_id');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const post = await Post.create({
            body,
            createdBy: user._id,
            photos,
            videos
        });

        return res.status(201).json({ message: "Post created successfully", post });

    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

