import mongoose from "mongoose";

const { model, Schema, models } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: { type: String, required: true },
    paymentId: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Done"],
      default: "Pending",
    },
    paymentTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", orderSchema);
