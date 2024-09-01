
import { Router } from 'express'
import { addCourseCategory, addLectureToCourseById, addNoticeToCourseById, createCourse, deleteCourseById, getAllCourses, getAllCourseWithCathegory, getcourseById, getCourseCategory, getCourseDescription, getCourseWithCategory, getLecturesByCourseId, InstMyCourse, myCourse, removeLectureFromCourse, updateCourseById } from '../controllers/course.controller.js';
import { authorizeRoles, authorizeSubscribers, isLoggedIn, isVerified } from '../middlewares/user.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import { isCourseInstructor } from '../middlewares/course.middleware.js';

const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(isLoggedIn, isVerified, authorizeRoles("INST", "ADMIN"), upload.single('thumbnail'), createCourse)
    .delete(isLoggedIn, authorizeRoles('INST', 'ADMIN'), isCourseInstructor, removeLectureFromCourse);


router
    .route('/mycourse/:courseId')
    .get(isLoggedIn, isVerified, authorizeSubscribers, getLecturesByCourseId)
    .post(
        isLoggedIn,
        isVerified,
        authorizeRoles('INST', 'ADMIN'),
        isCourseInstructor,
        upload.single('lecture'),
        addLectureToCourseById
    )
    .put(isLoggedIn,
        isVerified,
        authorizeRoles('INST', 'ADMIN'),
        isCourseInstructor,
        updateCourseById
    )
    .delete(isLoggedIn,
        isVerified,
        authorizeRoles('INST', 'ADMIN'),
        isCourseInstructor, deleteCourseById)

router
    .route('/notice/:courseId')
    .post(isLoggedIn, isVerified,isCourseInstructor, authorizeRoles('ADMIN', 'INST'), addNoticeToCourseById)

router
    .route('/all/categories')
    .get(getCourseWithCategory)

router
    .route('/category/:category')
    .get(getAllCourseWithCathegory)

router
    .route('/courseDescription/:courseId')
    .get(getCourseDescription)

router
    .route('/mycourse')
    .get(isLoggedIn, isVerified, authorizeRoles('USER'), myCourse)
router
    .route('/inst/mycourse')
    .get(isLoggedIn, isVerified, authorizeRoles('INST', 'ADMIN'), InstMyCourse)
router
    .route('/mycourse/getcourse/:courseId')
    .get(isLoggedIn, isVerified, authorizeSubscribers, getcourseById)

router
    .route('/addCategory')
    .post(isLoggedIn, isVerified, authorizeRoles('ADMIN'), addCourseCategory)
router
    .route('/getCategory')
    .get(isLoggedIn, isVerified, authorizeRoles('ADMIN', 'INST'), getCourseCategory)
export default router;