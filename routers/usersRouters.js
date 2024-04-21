import { Router } from "express";
import * as userControllers from "../controllers/userControllers.js";
const router = Router();

router.post("/signup", userControllers.signup);
router.post("/login" , userControllers.login);

export default router;
