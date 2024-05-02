import { Router } from "express";
import multer from "multer";
import * as productControllers from "../controllers/productControllers.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/products/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
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
