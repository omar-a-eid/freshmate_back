import orderModel from "../models/orderModel.js";

// it didnot bring the products with it when i added the array products
export async function GetAllOrdersForUser(req, res) {
    // middleware aw url *** 
    // try and catch ***
    // get all data from the DB
    const AllOrders = await orderModel.find({userId:"661ef7ea3f24889836a85b0c"});
    if (AllOrders) {
        return res.json(AllOrders);
    }
    return (res.status(400).json({ message: "error in loading the Orders" }));
}
export async function CreateOrder(req, res) {}
export async function GetOrderById(req, res) {}
export async function DeleteOrder(req, res) {}