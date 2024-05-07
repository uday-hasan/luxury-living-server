import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
export const checkOutRouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_SEC_KEY);

checkOutRouter.get("/config", async (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUB_KEY,
  });
});
checkOutRouter.post("/create-payment-intent", async (req, res) => {
  try {
    const { orders } = req.body;
    const sum = orders.reduce((s, order) => s + order.price, 0);
    // const sum = 1500;
    if (sum > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: sum * 100,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.json({
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch (err) {
    console.log({ stripe: err });
    res.json({ err });
  }
});
