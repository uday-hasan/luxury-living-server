import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  image: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  desc: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
});

const confirmOrderSchema = new mongoose.Schema(
  {
    orders: [serviceSchema],
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ConfirmOrder = mongoose.model("ConfirmOrder", confirmOrderSchema);
