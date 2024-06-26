import express from "express";
import { Comment } from "../../models/commentModel.js";

import { verifyJWT } from "../../middleware/jwt.js";

export const commentRouter = express.Router();

commentRouter.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find({});
    if (comments.length > 0) {
      let newComments = comments.reverse();
      return res.json({ data: newComments, success: true });
    }
    return res.json({ success: false, message: "No comments found" });
  } catch (error) {
    next(error);
  }
});

commentRouter.get("/productcomment/:productId", async (req, res) => {
  const id = req.params.productId;
  const comments = await Comment.find({ productId: id });
  if (comments.length > 0) {
    let newComments = comments.reverse();
    return res.json({ data: newComments, success: true });
  }
  return res.json({ success: false, message: "No comments found" });
});

// Comments according to product email
commentRouter.get("/usercomment/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const comments = await Comment.find({ "user.email": email });
    if (comments.length > 0) {
      let newComments = comments.reverse();
      return res.json({ data: newComments, success: true });
    }
    return res.json({ success: false, message: "No comments found" });
  } catch (err) {
    next(err);
  }
});

commentRouter.post("/", async (req, res) => {
  const { user, productId, comment, productName } = req.body;
  const newComment = new Comment({
    user,
    productId,
    comment,
    productName,
  });
  await newComment.save();
  return res.json({ success: true, message: "Comment posted" });
});

commentRouter.delete("/:id", async (req, res) => {
  const comments = await Comment.findByIdAndDelete({ _id: req.params.id });
  if (comments) {
    return res.json({ success: true, message: "Comment deleted" });
  } else {
    return res.json({ success: false, message: "Comment not found" });
  }
});
commentRouter.use((err, req, res, next) => {
  if (err) {
    res.send(err.message);
  }
});
