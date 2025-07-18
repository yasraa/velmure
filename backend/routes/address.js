
import express from 'express';
import {Shippingadd} from '../controller/addresscontroller.js'
const router = express.Router();

router.post('/address',Shippingadd)

export default router;