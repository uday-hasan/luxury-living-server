import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { userRouter } from "./routes/users/userRouter.js";
import { serviceRouter } from "./routes/services/serviceRouter.js";
import { orderRouter } from "./routes/order/orderRouter.js";
import { checkOutRouter } from "./routes/checkout/checkoutRouter.js";
import { commentRouter } from "./routes/comments/commentsRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const url = process.env.MONGO_URL;
const connectToDB = async () => {
  try {
    await mongoose.connect(url, {
      dbName: "luxuryLiving",
    });
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log(`Error in connectToDB: ${error}`);
  }
};
connectToDB();
app.get("/", (req, res) => {
  throw new Error("server");
  // res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/services", serviceRouter);
app.use("/order", orderRouter);
app.use("/payment", checkOutRouter);
app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    res.status(500).send("Headers error");
  } else {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port} and ${url}`);
});
