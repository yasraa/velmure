import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCartOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useCart } from '../context/CartContext';
import '../styles/procards.css'


const Prodc = () => {
  const { addToCart } = useCart(); // Importing addToCart from CartContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data); // assuming backend returns an array of products
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('❌ Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (

    <div style={{
      width:'100%',
     display:'flex',
     justifyContent:'center',
    }}>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className='kmj'>
          {products.map((product) => (
  <div key={product._id}
   onClick={() => setSelectedProduct(product)}
              style={{
                border: '1px solid #',
                padding: '1rem',
                width: '200px',
                borderRadius: '10px',
                backgroundColor:'#4B2E4C',
                color:'wheat',
                // box-shadow: 1px 1px 17px 2px rgba(94,40,72,0.75);
                boxShadow:'1px 1px 17px 2px rgba(94,40,72,0.75)'
              }}>
    <img src={`http://localhost:3000${product.imageUrl}`} alt={product.title}
     style={{ width: '100%', height: '150px', objectFit: 'cover',borderRadius:'10px',marginBottom:'10px' }} />
    <div className="product-details" style={{display:'flex',justifyContent:'space-between'}}>
      <div className="product-tt">
    <h3 style={{fontSize:'18px',fontFamily:'sans-serif', textTransform:'capitalize'}}>{product.title}</h3>
    <p style={{fontSize:'12px'}}>{product.price} PKR</p>
    </div>
    <button onClick={() => addToCart(product)} style={{border:'none',background:'transparent'}}>
      <IoCartOutline size={'30'} style={{color:'wheat'}}/>
    </button>
</div>
  </div>
))}

          {selectedProduct && (



            <div className='gjk'
                        >
                         
                          <img
                            src={`http://localhost:3000${selectedProduct.imageUrl}`}
                            alt={selectedProduct.title}
                          />
                          <div className="main-desc" style={{display:'flex', flexDirection:'column',width:'100%', justifyContent:'space-between'}}>
            
                                <button className='minb'
                            onClick={() => setSelectedProduct(null)}
                            style={{ fontSize: '1.2rem', border: 'none', background: 'none', textAlign:'end'}}
                          >
                            <RxCross2 size={40} style={{color:'wheat'}} />
                          </button>
            
                           <div className="kjj">
                            <div className="top-kkj">
                            <p>New Collection</p>
                          <h3 className='title'>{selectedProduct.title}</h3>
                          <p> {selectedProduct.price} PKR</p>
                          </div>
                          <p><strong>Description: </strong>{selectedProduct.description}</p>
                          
                          <div className="left-kjj">
                          <p><strong>Stock:</strong> Available</p>
                          <ul>
                            <li>
                               XS
                            </li>
            
                            <li>
                               S
                            </li>
                            <li>
                               M
                            </li>
                            <li>
                               L
                            </li>
                          </ul>
                          <button className='pcard' onClick={() => addToCart(selectedProduct)}> Add to Cart</button>
                          </div>
                          </div>
                            </div>
                        </div>




          )}

        </div>
      )}


    </div>
  );
};

export default Prodc;
