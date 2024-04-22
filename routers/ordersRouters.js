import { Router } from "express";
import * as orderControllers from "../controllers/orderControllers.js";

const router = Router();

router.get("/admin", orderControllers.GetAllOrders); //adel
router.get("/:id", orderControllers.GetOrdersById);//adel
router.put("/:id", orderControllers.UpdateOrders);//adel
router.use(orderControllers.extractUserId);//karim the middleware is it correct ???????????
router.get("/", orderControllers.GetAllOrdersForUser);//karim
router.post("/", orderControllers.CreateOrder);//salma
router.delete("/:id", orderControllers.DeleteOrder);//salma
export default router;
