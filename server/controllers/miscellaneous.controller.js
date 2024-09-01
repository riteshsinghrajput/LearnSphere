
import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import Course from '../models/course.model.js';
import USER from '../models/user.modal.js';
import AppError from '../utils/AppError.js';
import sendEmail from '../utils/sendEmail.js';
import cloudinary from 'cloudinary';


export const contactUs = asyncHandler(async (req, res, next) => {
  // Destructuring the required data from req.body
  const { name, email, message } = req.body;

  // Checking if values are valid
  if (!name || !email || !message) {
    return next(new AppError('Name, Email, Message are required'));
  }

  try {
    const subject = 'Contact Us Form';
    const textMessage = `${name} - ${email} <br /> ${message}`;

    // Await the send email
    await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage);
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }

  res.status(200).json({
    success: true,
    message: 'Your request has been submitted successfully',
  });
});

/**
 * @USER_STATS_ADMIN
 * @ROUTE @GET {{URL}}/api/v1/misc/admin/stats/users
 * @ACCESS Private(ADMIN ONLY)
 */
export const userStats = asyncHandler(async (req, res, next) => {
  const allUsersCount = await USER.countDocuments();

  const [userCounts, totalActiveCountResult] = await Promise.all([
    USER.aggregate([
        { $match: { 'subscription.0': { $exists: true } } }, // Match users with at least one subscription
        {
            $addFields: {
                activeSubscriptions: {
                    $filter: {
                        input: '$subscription',
                        as: 'sub',
                        cond: { $eq: ['$$sub.status', 'active'] } // Filter for active subscriptions
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                email: 1,
                activeSubscriptionCount: { $size: '$activeSubscriptions' } // Count active subscriptions
            }
        }
    ]),
    USER.aggregate([
        { $unwind: '$subscription' }, // Flatten subscription array
        { $match: { 'subscription.status': 'active' } }, // Match active subscriptions
        {
            $count: 'totalActiveSubscriptions' // Count total active subscriptions
        }
    ])
]);

const totalActiveSubscriptions = totalActiveCountResult.length > 0 ? totalActiveCountResult[0].totalActiveSubscriptions : 0;

   

  
  res.status(200).json({
    success: true,
    message: 'All registered users count',
    allUsersCount,
    subscribedUsersCount : userCounts,
    totalActiveSubscriptions
  });
});

export const InstUserStats = asyncHandler(async (req, res, next) => {
  const instructorId  = req.user.id;
  const courses = await Course.find({ 'createdBy.id': instructorId });
        
  // Extract course IDs
  const courseIds = courses.map(course => course._id);
  
  // Find users who have subscribed to these courses
  const users = await USER.find({
      'subscription.courseId': { $in: courseIds }
  }).populate('subscription.courseId'); // Optional: populate course details

  res.status(200).json(users);
});


