// controller/orderController.js
import order from "../models/order.js";
import Order from "../models/order.js";

export const createOrder = async (req, res) => {
  const { shippingAddress, products, totalPrice } = req.body;
  const userId = req.user._id; // from JWT middleware

  try {
    const order = new Order({
      user: userId,
      shippingAddress,
      products,
      totalPrice
    });

    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error" });
  }

};
export const getallorders = async(req,res)=>{
  try {
    const allorders = await order.find();
    res.json(allorders)
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export default{getallorders}