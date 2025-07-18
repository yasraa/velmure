import shipping from "../models/shipping.js";
import express from 'express';

const Shippingadd = async (req, res)=>{
    const {fullName, address,city,postalCode,country}=req.body;
     console.log("➡️ Reached POST /api/checkout");

    if (!fullName || !address || !city || !postalCode || !country) {
    return res.status(400).json({ message: 'Please fill in all fields' });
    }
    try{
        const newshippingadd = new shipping({
            
             user: req.user._id,fullName,address,city,postalCode,country})
       await newshippingadd.save()
       return res.status(201).json({ message: "Shipping address saved" });
    }catch(error){
 console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
    }
  
}
export {Shippingadd}