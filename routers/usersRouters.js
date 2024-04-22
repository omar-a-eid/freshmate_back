import { Router } from "express";
import * as userControllers from "../controllers/userControllers.js";
const router = Router();

router.post("/signup", userControllers.signup);
router.post("/login" , userControllers.login);
router.put("/:id" , userControllers.update); // edit the user with id or no ya omar 
export default router;
