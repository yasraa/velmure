import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Fetch cart from backend when component mounts
  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/cart', {
        withCredentials: true,
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error('❌ Failed to load cart', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ➕ Add to cart
  const addToCart = async (product) => {
    try {
      await axios.post(
        'http://localhost:3000/api/cart/add',
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      fetchCart(); // Refresh cart after adding
    } catch (err) {
      console.error('❌ Failed to add to cart', err);
    }
  };

  // ❌ Remove from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      fetchCart();
    } catch (err) {
      console.error('❌ Failed to remove item', err);
    }
  };

  // 🧹 Clear cart
  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:3000/api/cart/clear', {
        withCredentials: true,
      });
      setCart([]);
    } catch (err) {
      console.error('❌ Failed to clear cart', err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
// This code defines a CartContext for managing the shopping cart in an e-commerce application.
// It provides functions to fetch the cart, add items, remove items, and clear the cart using Axios for API requests.
// The context is created using React's createContext and useContext hooks, allowing components to access the cart state and functions easily.  