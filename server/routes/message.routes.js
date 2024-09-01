
import { Router } from 'express'
import upload from '../middlewares/multer.middleware.js';
import { getAllMessage, newMessage } from '../controllers/message.controller.js';

const router = Router();

router.post('/add', upload.single('file'), newMessage);
router.post('/get/:id', getAllMessage)

export default router