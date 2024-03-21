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

export const Service = mongoose.model("Service", serviceSchema);
