import express from "express";
import { Order } from "../../models/orderModel.js";
import { Service } from "../../models/serviceModel.js";

export const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  const orders = await Order.find({});
  return res.json({ orders });
});

orderRouter.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const orders = await Order.find({ userId });
  const productId = orders.map((product) => product.productId);
  const services = await Service.find({});

  const data = services.filter((service) => {
    return productId.includes(service._id.toString());
  });
  return res.json({ data });
});
orderRouter.post("/", async (req, res) => {
  const { productId, userId } = req.body;
  const exist = await Order.findOne({ userId, productId });
  if (exist) {
    const product = await Service.findOne({ _id: productId });
    return res.status(403).json({
      success: false,
      message: "Already added in Cart",
      data: product,
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
