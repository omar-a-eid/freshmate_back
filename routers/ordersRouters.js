import { Router } from "express";
import * as Ord_con from "../controllers/orderController.js";

const router = Router();

router.get("/admin", Ord_con.GetAllOrders);
router.post("/"); 
router.get("/:id", Ord_con.GetOrdersById);
router.put("/:id", Ord_con.UpdateOrders);
router.delete("/:id"); 
export default router;
