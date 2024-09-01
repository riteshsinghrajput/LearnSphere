
import INST from "../models/instructor.modal.js";
import ADMIN from '../models/admin.modal.js'
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/AppError.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None':"",
};

export const adminRegister = asyncHandler(async (req, res, next) => {

    const { fullName, email, password, confirmPassword } = req.body;
    if (!fullName || !email || !password || !confirmPassword) {
        return next(new AppError('All fields are required', 400));
    }
    if (password !== confirmPassword) {
        return next(new AppError('Password and Confirm password must be same ', 400));
    }

    const userExist = await ADMIN.findOne({ email });

    if (userExist) {
        return next(new AppError('Email alread exist', 409));
    }

    const user = await ADMIN.create({
        fullName, email, password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        },
        role:"ADMIN",
        isVerified: true
    })

    if (!user) {
        new AppError('Admin registration failed, please try again later', 400)
    }

    if (req.file) {
        try {

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LearnSphere/admin/profile/dp',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
                fs.rm(`uploads/${req.file.filename}`);
            }

        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 400)
            );
        }
    }

    await user.save();
    user.password = undefined;
    
    res.status(200).json({
        success:true,
        msg:"admin add successfuly"
    })
   
})

export const Adminlogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Enter All details', 400))
    }

    const user = await ADMIN.findOne({ email }).select('+password')

    if (!(user && (await user.comparePassword(password)))) {
        return next(
            new AppError('Email or Password do not match or user does not exist', 401)
        );
    }

    if (!user.isVerified) {
        return mailSendForVerify(req, res, user)
    }

    const token = await user.generateJWTToken();

    user.password = undefined;

    res.status(200).cookie('auth_token', token, cookieOptions).json({
        success: true,
        msg: 'Admin logged in successfully',
        user
    })


})
export const Instlogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Enter All details', 400))
    }

    const user = await INST.findOne({ email }).select('+password')

    if (!(user && (await user.comparePassword(password)))) {
        return next(
            new AppError('Email or Password do not match or user does not exist', 401)
        );
    }

    if (!user.isVerified) {
        return mailSendForVerify(req, res, user)
    }

    const token = await user.generateJWTToken();

    user.password = undefined;

    res.status(200).cookie('auth_token', token, cookieOptions).json({
        success: true,
        msg: 'Instructor logged in successfully',
        user
    })


})

export const adminRegisterInst = asyncHandler(async (req, res, next) => {

    const { fullName, email, password, confirmPassword } = req.body;
    if (!fullName || !email || !password || !confirmPassword) {
        return next(new AppError('All fields are required', 400));
    }
    if (password !== confirmPassword) {
        return next(new AppError('Password and Confirm password must be same ', 400));
    }

    const userExist = await INST.findOne({ email });

    if (userExist) {
        return next(new AppError('Email alread exist', 409));
    }

    const user = await INST.create({
        fullName, email, password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        },
        role:"INST",
        isVerified:true
    })

    if (!user) {
        new AppError('Instructor registration failed, please try again later', 400)
    }

    if (req.file) {
        try {

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LearnSphere/Instructor/profile/dp',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
                fs.rm(`uploads/${req.file.filename}`);
            }

        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 400)
            );
        }
    }

    await user.save();
    user.password = undefined;
    
    res.status(200).json({
        success:true,
        msg:"Instructor add successfuly"
    })
   
})

export const instructorDetails = asyncHandler (async (req,res,next)=>{
      
    const {instructorId} = req.params;

    if(!instructorId){
          return next(new AppError('provide instructor id' , 200));
    }

    const instructor = await INST.findById(instructorId);

    res.status(200).json({
        success: true,
        instructor
    })
})