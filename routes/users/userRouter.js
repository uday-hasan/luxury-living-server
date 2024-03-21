import express from "express";
import bcrypt from "bcrypt";
import { addToDB } from "../../actions/users/addToDB.js";
import { User } from "../../models/userModel.js";

export const userRouter = express.Router();

userRouter.get("/:email", async function (req, res) {
  const email = req?.params?.email;
  const find = await User.findOne({ email }).select("-password -__v");
  if (find) {
    return res.status(200).json({ success: true, data: find });
  } else {
    return res
      .status(200)
      .json({ success: false, message: "User is saving to DB " });
  }
});

userRouter.post("/login/:email", async function (req, res) {
  const email = req?.params?.email;
  const find = await User.findOne({ email });
  if (find) {
    const { password } = req.body;
    const isValidPassword = await bcrypt.compare(password, find.password);
    if (isValidPassword) {
      return res.status(200).json({ success: true, data: find });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Wrong Credentials" });
    }
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Wrong Credentials" });
  }
});

// Add a user to database
userRouter.post("/", addToDB);
