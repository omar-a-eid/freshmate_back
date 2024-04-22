import OrderValid from "../util/ordersValidation.js";
import { mapStatus } from "../util/orderUtil.js";
import OrderModel from "../models/orderModel.js";
import orderModel from "../models/orderModel.js";


// is this correct
// is this correct
// is this correct


// Middleware function to extract user ID from request
export async function extractUserId(req, res, next) {
    // Assuming user ID is present in req.user.id
    const userId = req.user.id;

    // Set the user ID in the request object
    req.userId = userId;

    // Call the next middleware or route handler
    next();
}
// it didnot bring the products with it when i added the array products
export async function GetAllOrdersForUser(req, res) {
    // try and catch
    try {
        // Get the user ID from the request
        const userId = req.userId;
        // get all data from the DB
        const allOrders = await OrderModel.find({ userId });
        if (allOrders) {
            // return res.json(allOrders);
            return res.status(200).json({ message: `Order of user ${userId} is :`, data: allOrders });

        }
        return (res.status(400).json({ message: "error in loading the Orders of the specific user" }));
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }

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
            } else {
                updatedOrder.userId = req.body.userId;
                updatedOrder.products = req.body.products;
                updatedOrder.totalPrice = req.body.totalPrice;
                updatedOrder.date = req.body.date;
                updatedOrder.status = req.body.status;
                console.log(updatedOrder);
                let finalOrder = await updatedOrder.save(); // this line ya omar makes an error 
                // let AllOrders = await OrderModel.find();
                // console.log(finalOrder);
                return res.status(200).json({ message: "Order Updated Successfully", data: updatedOrder });
            }
        } else {
            // return res.status(400).send("Invalid Order Data Entered");
            res.send(OrderValid.errors[0].instancePath.split("/")[1] + " : " + OrderValid.errors[0].keyword + " ==> " + OrderValid.errors[0].message);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};

export function CreateOrder(req, res) {
    try{
        // get order from user
        let newOrder = req.body; //{userId, products[], totalPrice, status, date}
        // check order object validation
        if(OrderValid(newOrder)){
            let order = new OrderModel(newOrder);
            order.save();
            return res.status(201).json({message:"Order Added Successfully", newOrder:order})
        }
        return res.status(404).send(OrderValid.errors[0].instancePath.split("/")[1]
                                     +": "+
                                    OrderValid.errors[0].keyword
                                     +" ==> "+
                                    OrderValid.errors[0].message 
                                );
    }catch(error){
        return res.status(500).json({ error: 'Internal Server Error' });
    }
 } 

export async function DeleteOrder(req, res) {
    try{
        // get order id
        const orderId = req.params.id;
        // find order matches this id
        const deletedOrder = await orderModel.findById(orderId);
        if(deletedOrder){
            // if exists delete order
            await orderModel.deleteOne({_id: orderId});
            return res.status(201).json({message: "Order Deleted Successfully"});
        }
        return res.status(404).send("Order Not Found");

    }catch(error){
        return res.status(500).json({ error: 'Internal Server Error' });
    }
 } 

export { GetAllOrders, GetOrdersById, UpdateOrders };
