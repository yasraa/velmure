import express from 'express';
import { getAllProducts,createProduct,updateProduct,deleteProduct } from '../controller/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js'; // Import the upload middleware
const router = express.Router();



// Image Upload Route
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

router.get('/', getAllProducts);
router.post('/', protect, adminOnly, createProduct);    
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
