import jwt from "jsonwebtoken";

const { verify } = jwt;

export const verifyJWT = async (req, res, next) => {
  try {
    const headers = req?.headers?.authorization?.split(" ")[1];
    console.log({ headers });
    if (!headers) return res.json({ success: false });
    const decoded = verify(headers, process.env.JWT_SECRET);
    if (decoded) {
      console.log(decoded);
      req.userEmail = decoded.email;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
