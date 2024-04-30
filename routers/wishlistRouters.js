import { Router } from "express";
import * as wishlistControllers from "../controllers/wishlistControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

router.get("/:id", isAuth, wishlistControllers.getWishlist);
router.post("/:id", isAuth, wishlistControllers.addWishlist);
router.delete("/:id", isAuth, wishlistControllers.removeItemFromWishlist);

export default router;
