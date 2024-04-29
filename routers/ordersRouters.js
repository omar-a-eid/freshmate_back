import { Router } from "express";
import * as orderControllers from "../controllers/orderControllers.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

router.get("/admin", isAuth, orderControllers.GetAllOrders);
router.get("/:id", isAuth, orderControllers.GetOrdersById);
router.put("/:id", isAuth, orderControllers.UpdateOrders);
router.get("/user/:id", isAuth, orderControllers.GetAllOrdersForUser);
router.post("/", isAuth, orderControllers.CreateOrder);
router.delete("/:id", isAuth, orderControllers.DeleteOrder);
export default router;
