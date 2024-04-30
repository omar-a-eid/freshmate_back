import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
