import express from 'express'
import { subuser } from '../controller/subscribercontroller.js'
const router=express.Router()

router.post('/subscribe',subuser);

export default router;