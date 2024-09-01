import { Router } from 'express';
import {
  contactUs,
  InstUserStats,
  userStats,
} from '../controllers/miscellaneous.controller.js';
import { authorizeRoles, isLoggedIn, isVerified } from '../middlewares/user.middleware.js';


const router = Router();

// {{URL}}/api/v1/
router.route('/contact').post(contactUs);
router
  .route('/admin/stats/users')
  .get(isLoggedIn, isVerified, authorizeRoles('ADMIN', 'INST'), userStats);
router
  .route('/inst/stats/users')
  .get(isLoggedIn, authorizeRoles('INST'), InstUserStats);



export default router;
