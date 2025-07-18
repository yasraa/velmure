import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
   const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  setErrors({}); // clear previous errors

  const newErrors = {};

  // Basic Validation
  if (!form.name.trim()) newErrors.name = 'Name is required';
  if (!form.email.trim()) newErrors.email = 'Email is required';
  if (!form.password.trim()) newErrors.password = 'Password is required';
  else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

  // If there are errors, stop and show them
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const res = await axios.post('http://localhost:3000/api/register', form, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(res.data);
    setMessage('✅ Registration successful!');
    setForm({ name: '', email: '', password: '' }); // clear form
      navigate('/');
  } catch (err) {
    console.error(err.response?.data || err.message);
    setMessage('❌ ' + (err.response?.data?.message || 'Something went wrong'));
  }
};


  return (
    <div className="login">
      <div className="r-s">
      <h2>Join The Cult</h2>
      <p>
        Create your Serein account for exclusive offers,<br/>
         early product access, and skincare tips you'll love.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <p className='pp'>
        Already Have An Acc? <Link to="/login">Log In</Link>
      </p>
    
      </div>
    </div>
  );
};

export default Register;
