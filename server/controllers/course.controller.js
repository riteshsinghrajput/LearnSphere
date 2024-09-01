import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import Course from '../models/course.model.js';

import AppError from '../utils/AppError.js';
import fs from 'fs/promises'
import path from 'path';
import cloudinary from 'cloudinary'
import USER from '../models/user.modal.js';

import categories from '../constants/categories.json' assert { type: 'json' };


export const createCourse = asyncHandler(async (req, res, next) => {
    const { title, description, category, price, createdByName, instId } = req.body;

    if (!title || !description || !category || !price || !createdByName) {
        return next(new AppError('All fields are required', 400));
    }
    let course = undefined
    if (req.user.role === "ADMIN") {

        if (!instId) {
            return next(new AppError('Select the Instructor properly', 400));
        }
        course = await Course.create({
            title,
            description,
            category,
            price,
            createdBy: {
                name: createdByName,
                id: instId
            }
        });
    }
    else {
        course = await Course.create({
            title,
            description,
            category,
            price,
            createdBy: {
                name: createdByName,
                id: req.user.id
            }
        });

    }


    if (!course) {
        return next(
            new AppError('Course could not be created, please try again', 400)
        );
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LearnSphere/course/thumbnail',
            });

            // If success
            if (result) {
                // Set the public_id and secure_url in array
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }

            // After successful upload remove the file from local storage
            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            for (const file of await fs.readdir('uploads/')) {
                await fs.unlink(path.join('uploads/', file));
            }
            await course.deleteOne()
            // Send the error message
            return next(

                new AppError(
                    JSON.stringify(error) || 'File not uploaded, please try again',
                    400
                )
            );
        }
    }

    // Save the changes

    await course.save();

    res.status(201).json({
        success: true,
        message: 'Course created successfully',
        course,
    });
});

export const getAllCourses = asyncHandler(async (_req, res, next) => {
    // Find all the courses without lectures
    const courses = await Course.find({}).select('-lectures');

    res.status(200).json({
        success: true,
        message: 'All courses',
        courses,
    });
});

export const removeLectureFromCourse = asyncHandler(async (req, res, next) => {
    // Grabbing the courseId and lectureId from req.query
    const { courseId, lectureId } = req.query;
    // Checking if both courseId and lectureId are present
    if (!courseId) {
        return next(new AppError('Course ID is required', 400));
    }

    if (!lectureId) {
        return next(new AppError('Lecture ID is required', 400));
    }

    // Find the course uding the courseId
    const course = await Course.findById(courseId);

    // If no course send custom message
    if (!course) {
        return next(new AppError('Invalid ID or Course does not exist.', 404));
    }

    // Find the index of the lecture using the lectureId
    const lectureIndex = course.lectures.findIndex(
        (lecture) => lecture._id.toString() === lectureId.toString()
    );

    // If returned index is -1 then send error as mentioned below
    if (lectureIndex === -1) {
        return next(new AppError('Lecture does not exist.', 404));
    }

    // Delete the lecture from cloudinary
    await cloudinary.v2.uploader.destroy(
        course.lectures[lectureIndex].lecture.public_id,
        {
            resource_type: 'video',
        }
    );

    // Remove the lecture from the array
    course.lectures.splice(lectureIndex, 1);

    // update the number of lectures based on lectres array length
    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    // Return response
    res.status(200).json({
        success: true,
        message: 'Course lecture removed successfully',
    });
});

export const addLectureToCourseById = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    const id = req.params.courseId;

    let lectureData = {};

    if (!title || !description) {
        return next(new AppError('Title and Description are required', 400));
    }
    const course = await Course.findById(id);

    if (!course) {
        return next(new AppError('Invalid course id or course not found.', 400));
    }



    if (req.file) {

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LearnSphere/course/Lectures',
                resource_type: 'video',
            });

            // If success
            if (result) {
                // Set the public_id and secure_url in array
                lectureData.public_id = result.public_id;
                lectureData.secure_url = result.secure_url;
            }

            // After successful upload remove the file from local storage
            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            // Empty the uploads directory without deleting the uploads directory
            for (const file of await fs.readdir('uploads/')) {
                await fs.unlink(path.join('uploads/', file));
            }
            fs.rm(`uploads/${req.file.filename}`);

            // Send the error message
            return next(
                new AppError(
                    JSON.stringify(error) || 'File not uploaded, please try again',
                    400
                )
            );
        }
    }
    course.lectures.push({
        title,
        description,
        lecture: lectureData,
    });

    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course lecture added successfully',
        course,
    });
});

export const updateCourseById = asyncHandler(async (req, res, next) => {
    // Extracting the course id from the request params
    const id = req.params.courseId;

    // Finding the course using the course id
    const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: req.body, // This will only update the fields which are present
        },
        {
            runValidators: true, // This will run the validation checks on the new data
        }
    );

    // If no course found then send the response for the same
    if (!course) {
        return next(new AppError('Invalid course id or course not found.', 400));
    }

    // Sending the response after success
    res.status(200).json({
        success: true,
        message: 'Course updated successfully',
    });
});

export const deleteCourseById = asyncHandler(async (req, res, next) => {
    // Extracting id from the request parameters
    const id = req.params.courseId;

    // Finding the course via the course ID
    const course = await Course.findById(id);

    // If course not find send the message as stated below
    if (!course) {
        return next(new AppError('Course with given id does not exist.', 404));
    }

    // Remove course
    await course.deleteOne();

    // Send the message as response
    res.status(200).json({
        success: true,
        message: 'Course deleted successfully',
    });
});

export const getLecturesByCourseId = asyncHandler(async (req, res, next) => {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
        return next(new AppError('Invalid course id or course not found.', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Course lectures fetched successfully',
        lectures: course.lectures,
    });
});

export const addNoticeToCourseById = asyncHandler(async (req, res, next) => {

    const courseId = req.params.courseId;
    const { timeTable, message } = req.body
    const course = await Course.findByIdAndUpdate(courseId);



    if (!course) {
        return next(new AppError('course not found', 400));
    }
    course.notice.timeTable = timeTable;
    course.notice.message = message

    await course.save()

    res.status(200).json({
        success: true,
        msg: "notice add succesfully"
    })




})

export const getCourseWithCategory = asyncHandler(async (req, res, next) => {

    const categories = await Course.distinct('category');
    res.status(200).json({
        success: true,
        categories
    })
})

export const getAllCourseWithCathegory = asyncHandler(async (req, res, next) => {
    const category = req.params.category.replace(/-/g, ' ');
    const courses = await Course.find({ category: category }).select('-lectures')

    res.status(200).json({
        success: true,
        courses: courses
    })
})


export const getCourseDescription = asyncHandler(async (req, res, next) => {
    const { courseId } = req?.params

    if (!courseId) {
        return next(new AppError('No id', 200));
    }

    const course = await Course.findById(courseId).select('-lectures');

    if (!courseId) {
        return next(new AppError('No course with this id', 200));
    }

    res.status(200).json({
        success: true,
        course
    })

})

export const myCourse = asyncHandler(async (req, res, next) => {
    const userId = req.user.id

    const user = await USER.findById(userId);

    if (!user) {
        return next(new AppError('please login or server error', 200));
    }

    const activeSubscriptions = user?.subscription?.filter((course) => {
        return course.status === 'active'
    })

    const courseIds = activeSubscriptions.map((sub) => sub.courseId);

    const mycourse = await Course.find({ _id: { $in: courseIds } }).select('-lectures');

    return res.status(200).json({
        success: true,
        mycourse
    })
})

export const InstMyCourse = asyncHandler(async (req, res, next) => {

    const instructorId = req.user.id;
    if (!instructorId) {
        return next(new AppError('please login to continue'))
    }
    const courses = await Course.find({ 'createdBy.id': instructorId })

    res.status(200).json({
        success: true,
        mycourse: courses
    })
})

export const getcourseById = asyncHandler(async (req, res, next) => {
    const { courseId } = req.params

    const course = await Course.findById(courseId);

    if (!course) {
        return next(new AppError('No course or server error', 200));
    }

    return res.status(200).json({
        success: true,
        course
    })
})

export const addCourseCategory = asyncHandler(async (req, res, next) => {
    const { category } = req.body;

    if (!category) {
        return next(new AppError("Enter the category", 400))
    }
    if (categories?.allowedCategories?.includes(category.toUpperCase())) {
        return next(new AppError('Category already exists', 400))
    }

    categories?.allowedCategories?.push(category.toUpperCase());


    await fs.writeFile("./constants/categories.json",
        JSON.parse(JSON.stringify(`{"allowedCategories" :${JSON.stringify(categories?.allowedCategories)}}`, null, 2))
    )

    res.status(200).json({
        success: true,
        msg: "Categories add sucessfuly"
    })


})

export const getCourseCategory = asyncHandler(asyncHandler(async (req, res, next) => {

    res.status(200).json({
        success: true,
        categories: categories?.allowedCategories
    })
}))