import { Router } from "express";
import multer from "multer";
import * as userControllers from "../controllers/userControllers.js";
import isAuth from "../middleware/isAuth.js";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/profiles/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/:id", userControllers.getUsersById);
router.post("/signup", upload.single("avatar"), userControllers.signup);
router.post("/login", userControllers.login);
router.put("/:id", isAuth, upload.single("avatar"), userControllers.update);
export default router;
