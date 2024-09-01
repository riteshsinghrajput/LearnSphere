import { Router } from 'express'
import { getConversation, newConversation } from '../controllers/conversation.controller.js';
const router = Router();

router
    .route('/add')
    .post(newConversation);
router
    .route('/get')
    .post(getConversation);


export default router