import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Explicitly allow your client's origin
  credentials: true // Allow cookies and other credentials
}));
app.use(express.json());  
app.use(cookieParser()); // Middleware to parse cookies  
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected successfully');    
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
import authRoutes from './routes/authRoutes.js';
app.use('/api', authRoutes);
app.use('/api/me', authRoutes); // Ensure auth routes are mounted correctly


import productRoutes from './routes/productRoutes.js';
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));
app.use('/api/products', productRoutes);

import cartRoutes from './routes/cartRoutes.js';

app.use('/api/cart', cartRoutes);

import subRoutes from './routes/subroute.js'
app.use('/api',subRoutes)

import addressRoute from './routes/address.js'
app.use('/api',addressRoute)

import orderRoutes from './routes/orderRoutes.js';
app.use('/api', orderRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});