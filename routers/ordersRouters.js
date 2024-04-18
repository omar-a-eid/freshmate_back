import { Router } from "express";
import * as orderControllers from "../controllers/orderControllers.js";
const router = Router();

router.get("/", orderControllers.GetAllOrders);
router.get("/:id", orderControllers.GetOrderById);
router.post("/", orderControllers.CreateOrder);
router.delete("/:id", orderControllers.DeleteOrder);

export default router;
