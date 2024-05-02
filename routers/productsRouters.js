import { Router } from "express";
import multer from "multer";
import path from "path";
import * as productControllers from "../controllers/productControllers.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

const filePath = path.join("public", "assets", "products");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", productControllers.GetProducts);
router.get("/:id", productControllers.GetProductsById);
router.post(
  "/",
  isAuth,
  upload.array("images", 5),
  productControllers.AddProduct
);
router.put(
  "/:id",
  isAuth,
  upload.array("images", 5),
  productControllers.UpdateProduct
);
router.delete("/:id", isAuth, productControllers.DeleteProduct);

export default router;
