import OrderModel from "../models/orderModel.js";
import { mapStatus } from "../util/orderUtil.js";

export async function GetAllOrdersForUser(req, res) {
  try {
    // Get the user ID from the request
    const userId = req.params.id;
    const sameUser = userId == req.userId;
    if (!sameUser) return res.status(401).json({ error: "Not Authenticateed" });
    // get all data from the DB
    const allOrders = await OrderModel.find({
      userId: userId,
    }).populate("products.product");
    if (allOrders) {
      return res.status(200).json(allOrders);
    }
    return res
      .status(400)
      .json({ message: "error in loading the Orders of the specific user" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

const GetAllOrders = async (req, res) => {
  if (req.email != "admin@gmail.com")
    return res.status(401).json({ error: "Not Authenticateed" });
  try {
    const allOrders = await OrderModel.find()
      .populate("products.product")
      .populate("userId");
    return res.json(allOrders);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const GetOrdersById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const foundOrder = await OrderModel.findById({ _id: orderId }).populate(
      "products.product"
    );
    const sameUser = foundOrder.userId == req.userId;

    if (foundOrder) {
      res.status(200).json(foundOrder);
    } else {
      res.status(404).send("Order Not Found");
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const UpdateOrders = async (req, res) => {
  if (req.email != "admin@gmail.com")
    return res.status(401).json({ error: "Not Authenticateed" });
  try {
    const orderId = req.params.id;
    let { status } = req.body;
    if (status) status = mapStatus(status);
    const updatedOrder = await OrderModel.findOne({ _id: orderId });
    if (!updatedOrder) {
      return res.status(404).send("Order Not Found");
    }
    updatedOrder.status = status;

    await updatedOrder.save();
    return res
      .status(200)
      .json({ message: "Order Updated Successfully", data: updatedOrder });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export async function CreateOrder(req, res) {
  try {
    // get order from user
    const { status } = req.body;

    // check order object validation
    if (status) req.body.status = mapStatus(status);

    await OrderModel.create(req.body);
    return res.status(201).json({ message: "Order Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function DeleteOrder(req, res) {
  try {
    // get order id
    const orderId = req.params.id;
    // find order matches this id
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    if (deletedOrder) {
      // if exists delete order
      return res.status(201).json({ message: "Order Deleted Successfully" });
    }
    return res.status(404).send("Order Not Found");
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { GetAllOrders, GetOrdersById, UpdateOrders };
