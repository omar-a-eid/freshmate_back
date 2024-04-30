import { Router } from "express";
import * as cartControllers from "../controllers/cartControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

router.get("/:id", isAuth, cartControllers.getCartItems);
router.post("/:id", isAuth, cartControllers.addCartItems);
router.put("/:id", isAuth, cartControllers.updateCartItems);

export default router;
