import OrderValid from "../util/ordersValidation.js";
import { mapStatus } from "../util/orderUtil.js";
import OrderModel from "../models/orderModel.js";

// it didnot bring the products with it when i added the array products
export async function GetAllOrdersForUser(req, res) {
    // middleware aw url *** 
    // try and catch ***
    // get all data from the DB
    const AllOrders = await OrderModel.find({ userId: "661ef7ea3f24889836a85b0c" });
    if (AllOrders) {
        return res.json(AllOrders);
    }
    return (res.status(400).json({ message: "error in loading the Orders" }));
}

const GetAllOrders = async (req, res) => {
    try {
        const allOrders = await OrderModel.find();
        return res.json(allOrders);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const GetOrdersById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const foundOrder = await OrderModel.findById(orderId);
        if (foundOrder) {
            res.status(200).json({ data: foundOrder });
        } else {
            res.status(404).send("Order Not Found");
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const UpdateOrders = async (req, res) => {
    try {
        const { status } = req.body;
        if (status) req.body.status = mapStatus(status);
        if (OrderValid(req.body)) {
            const orderId = req.params.id;
            const updatedOrder = await OrderModel.findOne({ _id: orderId });
            if (!updatedOrder) {
                return res.status(404).send("Order Not Found");
            }else{
                updatedOrder.userId = req.body.userId;
                updatedOrder.products = req.body.products;
                updatedOrder.totalPrice = req.body.totalPrice;
                // updatedOrder.date = req.body.date;
                // updatedOrder.status = req.body.status;
                console.log(updatedOrder);
                // let finalOrder = await updatedOrder.save(); // this line ya omar makes an error 
                // let AllOrders = await OrderModel.find();
                // console.log(finalOrder);
                return res.status(200).json({ message: "Order Updated Successfully", data: updatedOrder });
            }
        } else {
            return res.status(400).send("Invalid Order Data Entered");
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
    
};

export async function CreateOrder(req, res) { } //salma
export async function DeleteOrder(req, res) { } //salma

export { GetAllOrders, GetOrdersById, UpdateOrders };
