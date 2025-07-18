import React from 'react';
import './App.css'; // Importing global styles
import './index.css'; // Importing index styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
 import Login from './pages/Login'; 
 import Home from './pages/Home';
 import Admin from './pages/Admin';
 import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Products from './pages/products';
import Checkout from './pages/checkout.jsx'
import Orders  from './pages/orders.jsx';
function App() {
  return (
<CartProvider> {/* Wrap the entire app in CartProvider to provide cart context to all components */}
    <Router>
      <Routes>
           <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} /> 
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='products' element={<Products/>}/>
        <Route path ='/checkout' element={<Checkout/>}/>
        <Route path ='/Orders' element={<Orders/>}/>
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
