import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, 'your_secret_key', { expiresIn: '1h' });

      res.cookie('token', token, {
  httpOnly: true,
  secure: false, // change to true if using HTTPS
  sameSite: 'lax', // or 'strict'/'none' depending on frontend/backend setup
  maxAge: 3600000 // 1 hour
});
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });



  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
  console.log('req.body:', req.body);
};
//loginUser
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // change to true if using HTTPS
      sameSite: 'lax', // or 'strict'/'none' depending on frontend/backend setup
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export { registerUser , loginUser };