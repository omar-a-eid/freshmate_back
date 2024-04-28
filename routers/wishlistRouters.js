import { Router } from "express";
import * as wishlistControllers from "../controllers/wishlistControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

router.get("/:id", isAuth, wishlistControllers.getWishlist);
router.post("/:id", isAuth, wishlistControllers.addWishlist);
router.put("/:id", isAuth, wishlistControllers.updateWishlist);

export default router;
