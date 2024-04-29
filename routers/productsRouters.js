import { Router } from "express";
import * as productControllers from "../controllers/productControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

router.get("/", productControllers.GetProducts);
router.get("/:id", productControllers.GetProductsById);
router.post("/", isAuth, productControllers.AddProduct);
router.put("/:id", isAuth, productControllers.UpdateProduct);
router.delete("/:id", isAuth, productControllers.DeleteProduct);

export default router;
