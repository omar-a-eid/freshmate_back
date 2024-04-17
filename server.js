//#region imports
import bodyParser from "body-parser";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import ordersRouters from "./routers/ordersRouters.js";
import productsRouters from "./routers/productsRouters.js";
import usersRouters from "./routers/usersRouters.js";
//#endregion

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//#region routes
app.use("/api/users", usersRouters);
app.use("/api/products", productsRouters);
app.use("/api/orders", ordersRouters);
//#endregion

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
