import orderModel from "../models/orderModel.js";

// it didnot bring the products with it when i added the array products
export async function GetAllOrders(req, res) {
    // get all data from the DB
    var AllOrders = await orderModel.find();
    if (AllOrders) {
        return res.json(AllOrders);
    }
    return (res.status(400).json({ message: "error in loading the Orders" }));
}
export async function CreateOrder(req, res) {}
export async function GetOrderById(req, res) {}
export async function DeleteOrder(req, res) {}