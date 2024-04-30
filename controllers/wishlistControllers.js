import productModel from "../models/productModel.js";
import wishlistModel from "../models/wishlistModel.js";

export async function getWishlist(req, res) {
  const { userId } = req;

  try {
    const wishlist = await wishlistModel
      .findOne({ userId })
      .populate("products");
    if (wishlist) {
      return res.json(wishlist);
    } else {
      return res.json({ message: "No Products Found" });
    }
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

export async function addWishlist(req, res) {
  const productId = req.params.id;
  const { userId } = req;

  try {
    // Check if all products exist
    const existingProduct = await productModel.findOne({
      _id: productId,
    });

    if (!existingProduct) {
      return res.status(404).json({ message: `Product Not Found ` });
    }
    // Find or create wishlist for the user
    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
      await wishlistModel.create({ userId, products: [productId] });
    } else {
      const existingWishlistItem = wishlist.products.find(
        (id) => id.toString() === productId
      );

      if (existingWishlistItem) {
        return res
          .status(200)
          .json({ message: "Item is already in the wishlist" });
      } else {
        wishlist.products.push(productId);
      }
      await wishlist.save();
    }

    return res.status(200).json({ message: "Wishlist Added Successfully" });
  } catch (error) {
    console.error("Error adding wishlist:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function removeItemFromWishlist(req, res) {
  const productId = req.params.id;
  const { userId } = req;

  try {
    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist not found for this user" });
    }

    // Check if the product to remove exists in the wishlist
    if (!wishlist.products.includes(productId)) {
      return res
        .status(404)
        .json({ message: "Product not found in the wishlist" });
    }

    // Remove the product ID from the wishlist
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    // Save the updated wishlist
    await wishlist.save();

    return res
      .status(200)
      .json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return res.status(500).send("Internal Server Error");
  }
}
