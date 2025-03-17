import Post from "../../models/Post.js";
import User from "../../models/User.js";

export const createPost = async (req, res) => {
    const { body, photos, videos } = req.body;
    const email=req.email;

    const user=await User.findOne({email});

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const createdBy=user._id;

    try {
        const newPost = new Post({
            body,
            createdBy,
            photos,
            videos
        });

        await newPost.save();
        return res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

