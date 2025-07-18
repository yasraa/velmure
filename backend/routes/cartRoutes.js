import express from 'express';
import Cart from '../models/cart.js';
import Product from '../models/products.js';
import { protect,adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🛒 Get current user's cart
router.get('/', protect, adminOnly,async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  res.json(cart || { user: req.user._id, items: [] });
});

// ➕ Add or update item in cart
router.post('/add', protect,adminOnly, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(i => i.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
});

// ❌ Remove item
router.delete('/remove/:productId', protect,adminOnly, async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();

  res.json(cart);
});

// 🧹 Clear cart
router.delete('/clear', protect, adminOnly,async (req, res) => {
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
  res.json({ message: 'Cart cleared' });
});

export default router;
// This code defines routes for managing a shopping cart in an e-commerce application.
// It includes routes to get the current user's cart, add or update items in the cart,