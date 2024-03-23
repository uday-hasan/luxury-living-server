import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
export const checkOutRouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_SERVER);

checkOutRouter.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  if (price <= 0) {
    return res.send({ error: "error" });
  }
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

checkOutRouter.get("/", async (req, res) => {
  return res.json({ orders: "Hello World!" });
});
