import React,{useState} from 'react'
import axios from 'axios';
import Newsimg from '../assets/newsimg.png'
import '../styles/news.css' // Assuming you have a CSS file for styling the news signup component
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Newssignup = () => {

useGSAP(() => {
   gsap.to(".newssignup", {
              y: -20,
              opacity: 1,
              duration:2,
              delay:0.5,
              scrollTrigger: {
                trigger: ".newssignup",
                toggleActions: 'restart none none none',
              },
            });
})


   const [form, setForm] = useState({
      name: '',
      email: '',
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
  
    // If there are errors, stop and show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:3000/api/subscribe', form, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(res.data);
      setMessage('✅ Registration successful!');
      setForm({ name: '', email: ''}); // clear form
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage('❌ ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };
  
  
  return (
    <div className="newssignup" name="newssignup">
<h2>
  Be the first to know about launches, offers, and skincare tips.
</h2>
<div className="news-content">
 <div className="news-img">
  <img src={Newsimg} alt="" />
 </div>
 <div className="news-form">
 <form onSubmit={handleSubmit}>
   <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <button className='btn' type="submit">Subscribe</button>
          {message && <p>{message}</p>}
 </form>
     </div>
</div>
    </div>
  )
}

export default Newssignup