import { Router } from "express";
import * as userControllers from "../controllers/userControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.put("/:id", isAuth, userControllers.update);
export default router;
