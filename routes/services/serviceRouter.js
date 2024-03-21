import express from "express";
import { Service } from "../../models/serviceModel.js";
export const serviceRouter = express.Router();

serviceRouter.get("/", async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});
serviceRouter.get("/:id", async (req, res) => {
  const services = await Service.findOne({ _id: req.params.id });
  res.json(services);
});
