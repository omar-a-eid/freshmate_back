import { Router } from "express";
import * as userControllers from "../controllers/userControllers.js";
const router = Router();

router.get("/",userControllers.getusers);
router.post("/signup", userControllers.signup);
router.post("/login");

export default router;
