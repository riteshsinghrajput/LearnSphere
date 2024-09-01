import { Router } from "express";

import upload from "../middlewares/multer.middleware.js";
import { adminRegister, adminRegisterInst, Adminlogin, Instlogin, instructorDetails } from "../controllers/instructor.controller.js";
import { authorizeRoles, isLoggedIn, isVerified } from "../middlewares/user.middleware.js";



const router = Router();

router
    .route('/course/instructor/:instructorId' )
    .get(instructorDetails)
router
    .route('/register')
    .post(isLoggedIn , isVerified , authorizeRoles('ADMIN') ,upload.single('avatar'), adminRegister)
router
    .route('/login')
    .post(Adminlogin)
router
    .route('/inst/login')
    .post(Instlogin)
router
    .route('/instructor_register')
    .post(isLoggedIn,isVerified,authorizeRoles('ADMIN'), upload.single('avatar'), adminRegisterInst)


export default router;