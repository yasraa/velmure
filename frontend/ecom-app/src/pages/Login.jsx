import React, { useState } from 'react';
import '../styles/login.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
     const navigate = useNavigate();
    const [form, setForm] = useState({
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
        if (!form.email.trim()) newErrors.email = 'Email is required';
        if (!form.password.trim()) newErrors.password = 'Password is required';

        // If there are errors, stop and show them
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
                credentials: 'include' // to include cookies
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();
            console.log(data);
            setMessage('✅ Login successful!');
            setForm({ email: '', password: '' }); // clear form
            navigate('/'); // redirect to home page after successful login
        } catch (err) {
            console.error(err.message);
            setMessage('❌ ' + err.message);
        }
    };
  return (
    <div className='login'>
<div className="r-s">
        <h2>Welcome Back, Beautiful!</h2>
        <p>Log in to your Serein account<br/> and continue your skincare journey.</p>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
            <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
         <p className='pp'>
                Don't Have An Acc? <Link to="/register">Register</Link>
              </p>
</div>

    </div>
  )
}

export default Login