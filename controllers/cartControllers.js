import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export async function getCartItems(req, res) {
  const { userId } = req;

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

export async function addItemToCart(req, res) {
  const productId = req.params.id;
  const { userId } = req;
  let { quantity } = req.body;

  try {
    const existingProduct = await productModel.findOne({
      _id: productId,
    });

    if (!existingProduct) {
      return res.status(404).json({ message: `Product Not Found ` });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({
        userId,
        products: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      const existingCartItem = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingCartItem) {
        existingCartItem.quantity += quantity || 1;
      } else {
        quantity = quantity || 1;
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
    }

    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error adding cart:", error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function removeItemFromCart(req, res) {
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

export async function updateCartItemQuantity(req, res) {
  const { productId, quantity } = req.body;
  const { userId } = req;

  try {
    const cart = await cartModel.findOneAndUpdate(
      { userId, "products.product": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res
      .status(200)
      .json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return res.status(500).send("Internal Server Error");
  }
}
