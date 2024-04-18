import { Router } from "express";
import * as productControllers from "../controllers/productControllers.js";
const router = Router();

router.get("/", productControllers.GetProducts);
router.post("/", productControllers.AddProduct);
router.get("/:id", productControllers.GetProductsById);
router.put("/:id", productControllers.UpdateProduct);
router.delete("/:id", productControllers.DeleteProduct);

export default router;
