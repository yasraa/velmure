import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import { registerUser,loginUser} from '../controller/authController.js';
import { protect,adminOnly } from '../middleware/authMiddleware.js';
// Route for user registration
router.post('/register', registerUser);
// Route for user login
router.post('/login', loginUser);
// Protected route example (only accessible to logged-in users)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in /me:', error);
    res.status(500).json({ message: 'Server error' });
  }})
  // routes/authRoutes.js
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // or whatever cookie name you used
  res.json({ message: 'Logged out successfully' });
});
// This route handles user logout by clearing the authentication cookie.
// It responds with a success message.
export default router;