import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  status: {
    ar: {
      type: String,
      enum: ["معلق", "مقبول", "مرفوض"],
      required: true,
    },
    en: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
    },
  },
});

export default mongoose.model("Order", orderSchema);
