import { Router } from "express";
import { adminChangePassword, changePassword, forgotPassword, getLoggedInUserDetails, login, logoutUser, registerUser, resetPassword, updateUser, verifyUser } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { authorizeRoles, isLoggedIn, isVerified } from "../middlewares/user.middleware.js";


const router = Router();

router.post('/register', upload.single('avatar'), registerUser)

router
    .route('/login')
    .post(login)
router
    .route('/verify/:verify_token')
    .post(verifyUser)
router
    .route("/me")
    .get(isLoggedIn, isVerified, getLoggedInUserDetails);
router
    .route('/logout')
    .put(logoutUser)
router
    .route('/reset')
    .post(forgotPassword);
router
    .route('/reset/:resetToken')
    .post(resetPassword);

router
    .route("/change_password")
    .post(isLoggedIn, isVerified, changePassword);
router
    .route('/admin/change_password/:id')
    .post(isLoggedIn, isVerified, authorizeRoles('ADMIN'), adminChangePassword)

router
.route("/update")
.put(isLoggedIn,isVerified, upload.single("avatar"), updateUser);

export default router;