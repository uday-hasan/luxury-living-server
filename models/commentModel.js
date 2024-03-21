import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    comment: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Comment = mongoose.model("Comment", commentSchema);
