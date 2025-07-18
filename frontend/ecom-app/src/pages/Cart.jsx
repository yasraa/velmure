import { useState ,useEffect} from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css'
import { RxCross2 } from "react-icons/rx";
import Redirect from './redirect';


const Cart = () => {

   const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout", {
    });
  };
    const { user } = useAuth(); // Get the authenticated user from context
  const { cart, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
const [discount, setDiscount] = useState(0);

  const total = cart.reduce((acc, items) => acc + items.product.price * items.quantity, 0);
  const shipping = total + 250;
  const applyPromoCode = () => {
  if (promoCode === 'SAVE10') {
    setDiscount(total * 0.10); // 10% discount
  } else if (promoCode === 'OFF100') {
    setDiscount(total * 0.50); // flat 100 off
  } else {
    setDiscount(0);
    alert('Invalid promo code');
  }
};
const finalTotal = shipping - discount;
useEffect(() => {
  localStorage.setItem("finalTotal", JSON.stringify(finalTotal));
}, [finalTotal]);

if (!user) return <Redirect/>;
  
  return (
    <>
    <h2 className='carth'>Shopping Bag</h2>
    <div className='cart' style={{ padding: '2rem',display:'flex',justifyContent:'space-evenly',flexWrap:'wrap' }}>
      <div className="cart-products">
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>

          {cart.map(items => (
            <div key={items._id} style={{ border: '1px solid #ccc', padding: '13px', marginBottom: '1rem',display:'flex',width:'100%',height:'120px' }}>
              <img src={`http://localhost:3000${items.product.imageUrl}`} alt=".."
     style={{ height: '90px', objectFit: 'cover',borderRadius:'10px',marginBottom:'10px' }} />
              <div className="prod-cart-details">
                <div>
              <h3>{items.product.title}</h3>
              <p>Quantity: {items.quantity}</p>
              </div>
              <div className='cross-price'>
                <button onClick={() => removeFromCart(items._id)}>
                   <RxCross2 size={25} style={{color:'#4B2E4C'}} />
                </button>
              <p>{items.product.price}</p>
              </div>
               </div>
            </div>
          ))}
          
           <div className="cart-item-right">
          <button className='cc' onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
      </div>

      <div className="cart-calculation">
        <button  className='gb'>Back To Shopping</button>
        <div className="calc-total">
          <div className="promo-code"> 
            <input
        type="text"
        placeholder="Enter Promo Code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      />
      <button className='promo-btn' onClick={applyPromoCode}>Apply</button>
          </div>
          <div>
          <h3 className='summary'>Summary</h3>
             <div className="pin"><h4>Sub total</h4><p>{total}</p></div>
             <div className="pin"><h4>Shipping</h4><p>-250</p></div>
             <div className="pin"><h4>Discount</h4><p>{discount}</p></div>
             <div className="pin"><h4>Sub total</h4><p>{finalTotal}</p></div>
              <Link to={'/checkout'}>
          <button className='checkout-btn' onClick={handleCheckout}>Go To Checkout</button>
              </Link>
        </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default Cart;
// This Cart component displays the items in the cart, allows users to remove items, and clear the cart.
// It uses the `useCart` hook to access the cart context, which provides the cart state and functions to manipulate it.