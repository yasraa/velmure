import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/orders.css';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  useEffect(() => {
    if (user && user.isAdmin) {
      fetchOrders();
    }
  }, [user]); // Now fetchOrders is defined in scope


  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/orders', {
        withCredentials: true,
      });
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('❌ Failed to load orders');
      setLoading(false);
    }
  };
 if (!user) return <p>⛔ Please log in to access admin panel</p>;
  if (!user.isAdmin) return <p>⛔ Access Denied. You are not an admin.</p>;
  return (
    <div className='orderss'>
      <h2>🧾 Your Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="orders-wrapper">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-card">
                <h4>👤 {order.shippingAddress.fullName}</h4>
                <p>📍 {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                <p>📦 Total: ${order.totalPrice}</p>
                <p>🕒 Ordered on: {new Date(order.createdAt).toLocaleString()}</p>

                <h5>🛒 Items:</h5>
                <ul>
                  {order.products.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
