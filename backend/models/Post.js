import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  body: {
    type: String,
   default:null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sharedCount: {
    type: Number,
    default: 0,
  },
  sharedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Who liked the post
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  photos: [
    {
      type: String,
      default: null,
    },
  ],
  videos: [
    {
      type: String,
      default: null,
      validate: {
        validator: function (v) {
          // Check if the video size is within the 25MB limit
          // Assuming v is a file object with a size property in bytes
          return v ? v.size <= 25 * 1024 * 1024 : true;
        },
        message: "Video size should not exceed 25MB",
      },
    },
  ],
},
{timestamps:true}
);

const Post = mongoose.model("Post", postSchema);

export default Post;
