import { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import '../styles/checkout.css'

const Checkout = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
const finalTotal = JSON.parse(localStorage.getItem("finalTotal")) || 0;
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'cod'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
console.log("Final Price:", finalTotal);

const { cart } = useCart();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Cart is empty. Please go back and add products.");
      return;
    }

    const shippingAddress = {
      fullName,
      address,
      city,
      postalCode,
      country,
    };

    const products = cart.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        'http://localhost:3000/api/orders',
        {
          shippingAddress,
          products,
          totalPrice: finalTotal,
        },
         { withCredentials: true},
        {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
          },
        }
      );

      alert("✅ Order placed successfully!");
      console.log(response.data);

    
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div className='checkout'>
     <h1>checkout</h1>
     <p>add details to place order</p>
<div className="checkout-content">
<div className="shipping-details">
  <h2>shipping details</h2>
   <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
       <h2>payments detail</h2>
        <div className="payment-methods">
        <button
          type="button"
        
          onClick={() => setPaymentMethod('online')}
           style={{
            padding: '10px',
            flex: 1,
            backgroundColor: paymentMethod === 'online' ? '#4B2E4C' : '#f0f0f0',
            color: paymentMethod === 'online' ? 'white' : '#555',
            border: paymentMethod === 'online' ? 'none' : '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          Online Payment
        </button>
        <button
          type="button"
         
            style={{
            padding: '10px',
            flex: 1,
            backgroundColor: paymentMethod === 'cod' ? '#4B2E4C' : '#f0f0f0',
            color: paymentMethod === 'cod' ? 'white' : '#555',
            border: paymentMethod === 'cod' ? 'none' : '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setPaymentMethod('cod')}
        >
          Cash on Delivery
        </button>
      </div>
       {paymentMethod === 'online' && (
          <div className="payment-details">
            <h3>Enter Card Details</h3>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardChange}
              required
            />
             <div className="card-details-row">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleCardChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                required
              />
            </div>
          </div>
        )}
        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#4B2E4C', color: '#fff', border: 'none' }}>
          Place Order
        </button>
      </form>
  </div>
<div className="order-details">
 <h2>Your Order</h2>
        {cart.map((item) => (
          <div key={item._id} className="checkout-cart-item">
            <img 
              src={`http://localhost:3000${item.product.imageUrl}`} 
              alt={item.product.title}
              className="checkout-product-image"
              style={{width:'100px'}}
            />
            <div className="checkout-product-details">
              <h4>{item.product.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: Rs {item.product.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="checkout-total">
          <h4>Total: Rs {finalTotal}</h4>
        </div>

</div>
</div>

    </div>
  );
};

export default Checkout;


/*
 <h2>Add Your Address To Checkout</h2>

 <div className="cart-items-summary">
        <h3>Your Order</h3>
        {cart.map((item) => (
          <div key={item._id} className="checkout-cart-item">
            <img 
              src={`http://localhost:3000${item.product.imageUrl}`} 
              alt={item.product.title}
              className="checkout-product-image"
            />
            <div className="checkout-product-details">
              <h4>{item.product.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: Rs {item.product.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="checkout-total">
          <h4>Total: Rs {finalTotal}</h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      
        <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#444', color: '#fff', border: 'none' }}>
          Place Order
        </button>
      </form>
*/