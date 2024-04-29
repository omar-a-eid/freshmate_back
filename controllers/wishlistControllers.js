import productModel from "../models/productModel.js";
import wishlistModel from "../models/wishlistModel.js";

export async function getWishlist(req, res) {
  const userId = req.params.id;

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
  const userId = req.params.id;
  const { productsId } = req.body;

  try {
    // Check if all products exist
    const existingProducts = await productModel.find({
      _id: { $in: productsId },
    });
    const existingProductIds = existingProducts.map((product) =>
      product._id.toString()
    );
    const missingProducts = productsId.filter(
      (productId) => !existingProductIds.includes(productId)
    );

    if (missingProducts.length > 0) {
      return res
        .status(404)
        .json({ message: `Products Not Found: ${missingProducts.join(", ")}` });
    }
    // Find or create wishlist for the user
    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
      await wishlistModel.create({ userId, products: productsId });
    } else {
      const newProductIds = productsId.filter(
        (productId) => !wishlist.products.includes(productId)
      );
      wishlist.products.push(...newProductIds);
      await wishlist.save();
    }

    return res.status(200).json({ message: "Wishlist Added Successfully" });
  } catch (error) {
    console.error("Error adding wishlist:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateWishlist(req, res) {
  const userId = req.params.id;
  const { productId } = req.body;

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
