import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
export const checkOutRouter = express.Router();

const stripe = new Stripe(process.env.STRIPE_SEC_KEY);

checkOutRouter.get("/config", async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUB_KEY,
  });
});
checkOutRouter.post("/create-payment-intent", async (req, res) => {
  try {
    const amount = req.body.price;
    console.log(amount);
    if (amount > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        receipt_email: "udayhasan15@gmail.com",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    }
  } catch (err) {
    console.log({ stripe: err });
    res.send({ err });
  }
});
