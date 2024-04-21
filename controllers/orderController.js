import OrderValid from "../util/ordersValidation.js";
import mapStatus from "../util/orderUtil.js";
import OrderModel from "../models/orderModel.js";

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
        const {status} = req.body;
        if (status) req.body.status = mapStatus(status);
        if (OrderValid(req.body)) {
            const orderId = req.params.id;
            const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, req.body, { new: true });
            if (updatedOrder) {
                return res.status(200).json({ message: "Order Updated Successfully", data: updatedOrder });
            } else {
                return res.status(404).send("Order Not Found");
            }
        } else {
            return res.status(400).send("Invalid Order Data");
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { GetAllOrders, GetOrdersById, UpdateOrders };
