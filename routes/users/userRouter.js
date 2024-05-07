import express from "express";
import bcrypt from "bcrypt";
import { addToDB } from "../../actions/users/addToDB.js";
import { User } from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../../middleware/jwt.js";
export const userRouter = express.Router();

userRouter.get("/:email", async function (req, res, next) {
  try {
    const email = req?.params?.email;
    const find = await User.findOne({ email }).select("-password -__v");
    if (find) {
      return res.status(200).json({ success: true, data: find });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "User is saving to DB " });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login/:email", async function (req, res) {
  const email = req?.params?.email;
  const find = await User.findOne({ email });
  if (find) {
    const { password } = req.body;
    const isValidPassword = await bcrypt.compare(password, find.password);
    if (isValidPassword) {
      const token = await jwt.sign(
        { email: find?.email },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ success: true, data: find, token });
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
