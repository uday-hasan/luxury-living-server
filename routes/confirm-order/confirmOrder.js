import express from "express";
import { ConfirmOrder } from "../../models/confirmOrderModel.js";

export const confirmOrderRouter = express.Router();

confirmOrderRouter.get("/:id", async (req, res) => {
  try {
    const newOrder = await ConfirmOrder.find({ userId: req.params.id });

    res.json({ success: true, data: newOrder });
  } catch (error) {
    res.json({ error });
  }
});
confirmOrderRouter.post("/", async (req, res) => {
  try {
    const newOrder = new ConfirmOrder(req.body);
    await newOrder.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ error });
  }
});
