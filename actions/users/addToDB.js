import { User } from "../../models/userModel.js";
import bcrypt from "bcrypt";

export const addToDB = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = new User({
      name,
      email,
      password: hash,
    });
    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
