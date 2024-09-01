import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import Course from "../models/course.model.js";
import Payment from "../models/Payment.model.js";
import USER from "../models/user.modal.js";
import { razorpay } from "../server.js";
import AppError from "../utils/AppError.js";
import crypto from 'crypto'

export const buySubscription = asyncHandler(async (req, res, next) => {
  // Extracting ID from request obj
  const { id } = req.user;
  const courseId = req.params.courseId;

  // Finding the user based on the ID
  const user = await USER.findById(id);

  if (!user) {
    return next(new AppError('Unauthorized, please login'));
  }

  const course = await Course.findById(courseId)

  if (!course) {
    return next(new AppError('NO course is available', 400))
  }



  // Checking the user role
  if (user.role === 'ADMIN' || user.role === 'INST') {
    return next(new AppError('Admin cannot purchase a subscription', 400));
  }

  let existenseIndex = user.subscription.findIndex(sub => sub.courseId.equals(courseId));




  if (existenseIndex !== -1 && user.subscription[existenseIndex].status === 'active') {
    return next(new AppError('You already purchase this course', 400))
  }

  if (existenseIndex !== -1) {
    user.subscription.splice(existenseIndex, 1)
    await user.save();
  }

  const planOption = {
    period: 'yearly',
    interval: 1,
    item: {
      name: course.title,
      amount: course.price * 100,
      currency: 'INR'
    }

  }

  const plan = await razorpay.plans.create(planOption)




  // Creating a subscription using razorpay that we imported from the server
  const subscription = await razorpay.subscriptions.create({
    plan_id: plan.id, // The unique plan ID
    customer_notify: 1, // 1 means razorpay will handle notifying the customer, 0 means we will not notify the customer
    total_count: 1,
  });

  const sub = {
    courseId: courseId,
    status: subscription.status,
    subscribeId: subscription.id

  }

  user.subscription.push(sub)
  user.save();

  // Saving the user object
  res.status(200).json({
    success: true,
    message: 'subscribed successfully',
    subscription_id: subscription.id,
  });
});


export const verifySubscription = asyncHandler(async (req, res, next) => {

  const userId = req.user.id;

  const courseId = req.params.courseId

  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

  if (!courseId) {
    return next(new AppError('Please select the course', 400))
  }
  if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
    return next(new AppError('something went wrong', 400))
  }

  const user = await USER.findById(userId)

  if (!user) {
    return next(new AppError(" please login again", 401))
  }

  const subscriptionCourse = user.subscription.find(sub => sub.courseId.equals(courseId));

  if (!subscriptionCourse) {
    return next(new AppError("please purchase the course"))
  }

  const subscriptionId = subscriptionCourse.subscribeId

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest('hex');

   console.log(generatedSignature)
  if (generatedSignature !== razorpay_signature) {
    return next(new AppError('Payment not verified, please try again.', 400));
  }

  const subscriptionCourseIndex = user.subscription.findIndex(sub => sub.courseId.equals(courseId));

  if (user.subscription[subscriptionCourseIndex].status !== 'active') {
    await Payment.create({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    });
  }
  user.subscription[subscriptionCourseIndex].status = 'active';


  await user.save();

  res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
  });

});

export const getRazorpayApiKey = asyncHandler(async (_req, res, _next) => {
  res.status(200).json({
    success: true,
    message: 'Razorpay API key',
    key: process.env.RAZORPAY_KEY_ID,
  });
});

export const cancelSubscription = asyncHandler(async (req, res, next) => {

  const userId = req.user.id;
  const courseId = req.params.courseId;

  const user = await USER.findById(userId);
  let subscriptionId;
  try {
    const subscriptionCourse = user.subscription.find(sub => sub.courseId.equals(courseId));

    if (!subscriptionCourse) {
      return next(new AppError("please purchase the course before deletion"))
    }

    subscriptionId = subscriptionCourse.subscribeId

    console.log(subscriptionId, userId, courseId)
    const subscription = await razorpay.subscriptions.cancel(
      subscriptionId
    )

    const subscriptionCourseIndex = user.subscription.findIndex(sub => sub.courseId.equals(courseId));
    
    console.log(subscription)

    user.subscription[subscriptionCourseIndex].status = subscription.status;

    await user.save();

  } catch (error) {
    return next(new AppError(error.message));
  }

  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId
  })  

  // console.log(payment)

  // const timeSinceSubscribed = Date.now() - payment.createdAt;

  // const refundPeriod = 14 * 24 * 60 * 60 * 1000;

  // // Check if refund period has expired or not
  // if (refundPeriod <= timeSinceSubscribed) {
  //   return next(
  //     new AppError(
  //       'Refund period is over, so there will not be any refunds provided.',
  //       400
  //     )
  //   );
  // }

  // await razorpay.payments.refund(payment.razorpay_payment_id, {
  //   speed: 'optimum', // This is required
  // });


  // user.subscription.splice(existenseIndex, 1)
  // await user.save();


  res.status(200).json({
    success: true,
    message: 'Subscription canceled successfully',
  });

})

export const allPayments = asyncHandler(async (req, res, _next) => {
  const { count, skip } = req.query;

  // Find all subscriptions from razorpay
  const allPayments = await razorpay.subscriptions.all({
    count: count ? count : 10, // If count is sent then use that else default to 10
    skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const monthlyWisePayments = allPayments.items.map((payment) => {
    // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
    const monthsInNumbers = new Date(payment.start_at * 1000);

    return monthNames[monthsInNumbers.getMonth()];
  });

  monthlyWisePayments.map((month) => {
    Object.keys(finalMonths).forEach((objMonth) => {
      if (month === objMonth) {
        finalMonths[month] += 1;
      }
    });
  });

  const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });

  res.status(200).json({
    success: true,
    message: 'All payments',
    allPayments,
    finalMonths,
    monthlySalesRecord,
  });
});
