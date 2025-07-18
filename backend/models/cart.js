import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema]
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
// This code defines a Mongoose schema for a shopping cart in an e-commerce application.
// The `cartItemSchema` defines the structure of each item in the cart, including a reference to the product and the quantity.
// The `cartSchema` defines the structure of the cart itself, which is associated with a user and contains an array of items.
// The cart is designed to be unique per user, ensuring that each user has their own cart.