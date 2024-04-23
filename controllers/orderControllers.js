import OrderModel from "../models/orderModel.js";
import { mapStatus } from "../util/orderUtil.js";
import OrderValid from "../util/ordersValidation.js";

// is this correct
// is this correct
// is this correct

// Middleware function to extract user ID from request
// export async function extractUserId(req, res, next) {
//     // Assuming user ID is present in req.user.id
//     const userId = req.user.id;

//     // Set the user ID in the request object
//     req.userId = userId;

//     // Call the next middleware or route handler
//     next();
// }

// it didnot bring the products with it when i added the array products
export async function GetAllOrdersForUser(req, res) {
  // try and catch
  try {
    // Get the user ID from the request
    const userId = req.params.id;
    // get all data from the DB
    const allOrders = await OrderModel.find({
      userId: "661ef7ea3f24889836a85b0c",
    });
    if (allOrders) {
      // return res.json(allOrders);
      return res
        .status(200)
        .json({ message: `Order of user ${userId} is :`, data: allOrders });
    }
    return res
      .status(400)
      .json({ message: "error in loading the Orders of the specific user" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const GetAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find();
    return res.json(allOrders);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const GetOrdersById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const foundOrder = await OrderModel.findById({ _id: orderId });
    if (foundOrder) {
      res.status(200).json({ data: foundOrder });
    } else {
      res.status(404).send("Order Not Found");
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const UpdateOrders = async (req, res) => {
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
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export function CreateOrder(req, res) {
  try {
    // get order from user
    const { status } = req.body;

    // check order object validation
    if (status) req.body.status = mapStatus(status);

    if (OrderValid(req.body)) {
      const order = new OrderModel(req.body);
      order.save();
      return res
        .status(201)
        .json({ message: "Order Added Successfully", newOrder: order });
    }
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
      //   await orderModel.deleteOne({ _id: orderId });
      return res.status(201).json({ message: "Order Deleted Successfully" });
    }
    return res.status(404).send("Order Not Found");
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { GetAllOrders, GetOrdersById, UpdateOrders };
