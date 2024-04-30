import productModel from "../models/productModel.js";
import cartModel from "../models/cartModel.js";

export async function getCartItems(req, res) {
  const userId = req.params.id;

  try {
    const cart = await cartModel
      .findOne({ userId })
      .populate("products");
    if (cart) {
      return res.json(cart);
    } else {
      return res.json({ message: "No Products Found" });
    }
  } catch (error) {
    return res.status(500).send("internal server error");
  }
}

export async function addCartItems(req, res) {
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
    // Find or create cart for the user
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      await cartModel.create({ userId, products: productsId });
    } else {
      const newProductIds = productsId.filter(
        (productId) => !cart.products.includes(productId)
      );
      cart.products.push(...newProductIds);
      await cart.save();
    }

    return res.status(200).json({ message: "cart Added Successfully" });
  } catch (error) {
    console.error("Error adding cart:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateCartItems(req, res) {
  const userId = req.params.id;
  const { productId } = req.body;

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "cart not found for this user" });
    }

    // Check if the product to remove exists in the cart
    if (!cart.products.includes(productId)) {
      return res
        .status(404)
        .json({ message: "Product not found in the cart" });
    }

    // Remove the product ID from the cart
    cart.products = cart.products.filter(
      (id) => id.toString() !== productId
    );

    // Save the updated cart
    await cart.save();

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).send("Internal Server Error");
  }
}
