import mongoose from "mongoose";

const { Schema } = mongoose;

const wishlistSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

export default mongoose.model("Wishlist", wishlistSchema);
