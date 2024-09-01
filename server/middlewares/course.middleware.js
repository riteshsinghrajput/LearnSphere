import Course from "../models/course.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.middleware.js";


export const isCourseInstructor = asyncHandler(async (req, res, next) => {
    const courseId = req?.params?.courseId ?req?.params?.courseId : req?.query?.courseId;
    if (!courseId) {
        return next(new AppError('Id does not exist', 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
        return next(new AppError('No course exist', 400));
    }

    const instructorId = course.createdBy.id;

    if (req.user.role !== 'ADMIN' && instructorId !== req.user.id) {
        return next(new AppError("You do not have permission to view this route", 403));
    }
    next();
})