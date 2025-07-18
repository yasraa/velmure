import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for user authentication
import { Link } from 'react-router-dom';
import '../styles/admin.css'

const Admin = () => {
  const { user } = useAuth(); // Get the authenticated user from context
   // 🔐 Protect this page
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    if (user && user.isAdmin) {
      fetchProducts();
    }
  }, [user]);
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3000/api/products', {
      withCredentials: true // Ensure cookies are sent with the request for authentication
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:3000/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setForm(prev => ({ ...prev, imageUrl: res.data.imageUrl }));
      setMessage('✅ Image uploaded');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to upload image');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/products/${editingId}`, form,
          { withCredentials: true } // Ensure cookies are sent with the request for authentication
        );
        setMessage('✅ Product updated');
      } else {
        await axios.post('http://localhost:3000/api/products', form,
          { withCredentials: true } // Ensure cookies are sent with the request for authentication
        );
        setMessage('✅ Product added');
      }

      setForm({ title: '', imageUrl: '', description: '', price: '', category: '', stock: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit');
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`
          , { withCredentials: true } // Ensure cookies are sent with the request for authentication
        );
        fetchProducts();
        setMessage('🗑️ Product deleted');
      } catch (err) {
        console.error(err);
        setMessage('❌ Failed to delete');
      }
    }
  };
  if (!user) return <p>⛔ Please log in to access admin panel</p>;
  if (!user.isAdmin) return <p>⛔ Access Denied. You are not an admin.</p>;
  return (
    <div className='admin'>
      <h2> Admin Panel</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      
        {form.imageUrl && (
          <img src={form.imageUrl} alt="Preview" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
        )}

        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required type="number" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <h3>📦 Product List</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' ,justifyContent:'center'}}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <img  src={`http://localhost:3000${product.imageUrl}`}
             alt={product.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
            <h4>{product.title}</h4>
            <p>Price: PKR {product.price}</p>
            <button onClick={() => handleEdit(product)}>✏️ Edit</button>
            <button onClick={() => handleDelete(product._id)}>❌ Delete</button>
          </div>
        ))}
      </div>
      <Link to="/orders">
      <button className='v-order'>View Orders</button>
      </Link>
    </div>
  );
};

export default Admin;




// This code provides a simple admin panel for managing products in an e-commerce application.
// It allows admins to add, edit, and delete products, as well as upload images for products.
// The admin panel fetches the list of products from the backend and displays them in a grid format.
// It also includes a form for adding or editing products, with fields for title, image, description, price, category, and stock.
// The admin can upload an image, which will be displayed as a preview in the form.   
