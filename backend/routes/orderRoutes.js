// routes/orderRoutes.js
import express from 'express';
import { createOrder,getallorders } from '../controller/ordercontroller.js';
import { protect,adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/orders', protect,adminOnly, createOrder);
router.get('/orders', protect,adminOnly, getallorders);
export default router;
