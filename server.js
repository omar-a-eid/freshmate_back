//#region imports
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cartRouters from "./routers/cartRouters.js";
import ordersRouters from "./routers/ordersRouters.js";
import productsRouters from "./routers/productsRouters.js";
import usersRouters from "./routers/usersRouters.js";
import wishlistRouters from "./routers/wishlistRouters.js";

//#endregion

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

//#region routes
app.use("/api/users", usersRouters);
app.use("/api/products", productsRouters);
app.use("/api/orders", ordersRouters);
app.use("/api/wishlist", wishlistRouters);
app.use("/api/cart", cartRouters);
//#endregion

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
