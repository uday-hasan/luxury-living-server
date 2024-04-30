import express from "express";
import { Order } from "../../models/orderModel.js";
import { Service } from "../../models/serviceModel.js";
// import { verifyJWT } from "../../middleware/jwt.js";

export const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  const orders = await Order.find({});
  return res.json({ orders });
});

orderRouter.get("/pending/:userId", async (req, res) => {
  const userId = req.params.userId;
  const orders = await Order.find({ userId, status: "Pending" });
  const productId = orders.map((product) => product.productId);
  const services = await Service.find({});

  const data = services.filter((service) => {
    return productId.includes(service._id.toString());
  });
  return res.json({ data });
});

orderRouter.get("/done/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const orders = await Order.find({ userId, status: "Done" });
    const productId = orders.map((product) => product.productId);
    const services = await Service.find({});
    const data = services.filter((service) => {
      return productId.includes(service._id.toString());
    });
    return res.json({ data, orders, success: true });
  } catch (err) {
    res.json({ success: false });
  }
});
orderRouter.post("/", async (req, res) => {
  const { productId, userId } = req.body;
  const exist = await Order.findOne({ userId, productId, status: "Pending" });
  if (exist) {
    return res.status(403).json({
      success: false,
      message: "Please complete the payment.",
      data: exist,
    });
  }
  const newOrder = new Order({ userId, productId });
  await newOrder.save();
  const addedItem = await Service.findOne({ _id: productId });
  return res
    .status(200)
    .json({ success: true, message: "Added in Cart", data: addedItem });
});

orderRouter.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  const order = await Order.findOne({ userId, productId });
  if (order) {
    const orderId = order._id;
    await Order.findByIdAndDelete({ _id: orderId });
    return res
      .status(200)
      .json({ success: true, message: "Removed from Cart" });
    res.json({ success: true, message: "Removed from cart" });
  }
  return res.status(404).json({ success: false, message: "Not Found" });
});

orderRouter.delete("/:id", async function (req, res) {
  const id = req?.params?.id;
  const find = await Order.deleteMany({ userId: id });
  res.json({ success: true });
});

//Update order after payment
orderRouter.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { paymentId } = req.body;
  const time = new Date();
  const data = { paymentId, paymentTime: time, status: "Done" };
  const doc = await Order.updateMany({ userId }, data);
  res.send(doc);
});
