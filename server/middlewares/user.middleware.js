import USER from "../models/user.modal.js";
import asyncHandler from "./asyncHandler.middleware.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import INST from "../models/instructor.modal.js";
import ADMIN from "../models/admin.modal.js";


export const isVerified = asyncHandler(async (req, res, next) => {
    const auth_token = req.params.auth_token || req.cookies.auth_token;

    if (!auth_token) {
        return next(new AppError("Unauthorized, please re login to continue", 401));
    }

    const decoded = await jwt.verify(auth_token, process.env.JWT_SECRET);

    if (!decoded) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }
    req.user = decoded;

    const user = await USER.findById(decoded.id) || await INST.findById(decoded.id) || await ADMIN.findById(decoded.id)
    if (!user) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    if (!user.isVerified) {
        return next(new AppError("Unauthorized, please verify your account", 401));
    }
    next();
})

export const isLoggedIn = asyncHandler(async (req, _res, next) => {

    const { auth_token } = req.cookies;

    if (!auth_token) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    const decoded = await jwt.verify(auth_token, process.env.JWT_SECRET);


    if (!decoded) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    req.user = decoded;


    next();
});


export const authorizeRoles = (...roles) =>
    asyncHandler(async (req, _res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission to view this route", 403)
            );
        }

        next();
    });


export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {

    const user = await USER.findById(req.user.id)
    const courseId =  req.params.courseId

    let existenseIndex = user?.subscription?.findIndex(sub => sub.courseId.equals(courseId));
    
    if (req?.user?.role !== "ADMIN" && req?.user?.role !== 'INST' && user?.subscription[existenseIndex]?.status !== "active") {
        return next(new AppError("Please subscribe to access this route.", 403));
    }

    next();
});

export const UserIPAddress = asyncHandler(async(req,res,next)=>{
    // Get the IP address from the request
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const formattedIp = ipAddress.includes('::ffff:') ? ipAddress.split('::ffff:')[1] : ipAddress;
    // You can store the IP address in the session, database, or use it directly
    req.userIpAddress = formattedIp;
  
    next();
  })
  