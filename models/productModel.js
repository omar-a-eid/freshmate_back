import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  images: { type: [String], required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  desc: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
});

export default mongoose.model("Product", productSchema);
