import { Router } from 'express'
import { authorizeRoles, authorizeSubscribers, isLoggedIn, isVerified } from '../middlewares/user.middleware.js'
import { allPayments, buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from '../controllers/subscription.controller.js';



const router = Router()

router
   .route('/razorpay-key')
   .get(getRazorpayApiKey)
router
   .route('/subscribe/:courseId')
   .post(isLoggedIn, isVerified, authorizeRoles('USER'), buySubscription)

router
   .route('/verify/:courseId')
   .post(isLoggedIn, isVerified, authorizeRoles('USER'), verifySubscription);
router
   .route('/cancel/:courseId')
   .delete(isLoggedIn, isVerified, authorizeSubscribers, cancelSubscription)

router
   .route('/')
   .get(isLoggedIn, authorizeRoles('ADMIN' ,'INST'), allPayments);
export default router;