import { Router } from "express";
import multer from "multer";
import path from "path";
import * as userControllers from "../controllers/userControllers.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();
const filePath = path.join("public", "assets", "profiles");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/:id", userControllers.getUsersById);
router.post("/signup", upload.single("avatar"), userControllers.signup);
router.post("/login", userControllers.login);
router.put("/:id", isAuth, upload.single("avatar"), userControllers.update);
export default router;
