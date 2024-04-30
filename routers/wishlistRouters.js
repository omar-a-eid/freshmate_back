import { Router } from "express";
import * as wishlistControllers from "../controllers/wishlistControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

router.get("/", isAuth, wishlistControllers.getWishlistItems);
router.post("/:id", isAuth, wishlistControllers.addItemToWishlist);
router.delete("/:id", isAuth, wishlistControllers.removeItemFromWishlist);

export default router;
