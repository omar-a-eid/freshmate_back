import { Router } from "express";
import * as cartControllers from "../controllers/cartControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

router.get("/", isAuth, cartControllers.getCartItems);
router.post("/:id", isAuth, cartControllers.addItemToCart);
router.delete("/:id", isAuth, cartControllers.removeItemFromCart);
router.put("/:id", isAuth, cartControllers.updateCartItemQuantity)

export default router;
