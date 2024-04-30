import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export async function getCartItems(req, res) {
  const userId = req.params.id;

  try {
    const cart = await cartModel
      .findOne({ userId })
      .populate("products.product");
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
  const productId = req.params.id;
  const { userId } = req;
  const { quantity } = req.body;

  try {
    // Check if all products exist
    const existingProduct = await productModel.findOne({
      _id: productId,
    });

    if (!existingProduct) {
      return res.status(404).json({ message: `Product Not Found ` });
    }
    // Find or create cart for the user
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      await cartModel.create({
        userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      const existingCartItem = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    }

    return res.status(200).json({ message: "cart Added Successfully" });
  } catch (error) {
    console.error("Error adding cart:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function updateCartItems(req, res) {
  const productId = req.params.id;
  const { userId } = req;

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    const existingCartItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!existingCartItem) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).send("Internal Server Error");
  }
}
