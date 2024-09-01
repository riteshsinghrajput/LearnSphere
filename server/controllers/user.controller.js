import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import USER from "../models/user.modal.js";
import AppError from "../utils/AppError.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises'
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import ADMIN from "../models/admin.modal.js";
import INST from "../models/instructor.modal.js";


const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : ""
};

const mailSendForVerify = async (req, res, user) => {
    const token = await user.generateVerifyToken();
    const verifyUserURL = `${process.env.CLIENT_URL}/verifyUser/${token}`;

    const subject = 'Verified your account';
    const message = `You can verify your account by clicking <a href=${verifyUserURL} target="_blank"> <b>Verify <b></a>  before ${process.env.VERIFY_TOKEN_EXPIRY}<br /> <br />  If the above link does not work for some reason then copy paste this link in new tab ${verifyUserURL}.<br /> <br /> If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(user.email, subject, message);
        return res.json({ success: true, msg: `Email is sent to  ${user.email} for verfiy`, type: "verify" });
    } catch (error) {
        return res.json({ success: false, msg: error.message, type: "verify" })
    }
}

export const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, confirmPassword } = req.body;


    if (!fullName || !email || !password || !confirmPassword) {
        return next(new AppError('All fields are required', 400));
    }
    if (password !== confirmPassword) {
        return next(new AppError('Password and Confirm password must be same ', 400));
    }

    const userExist = await USER.findOne({ email });

    if (userExist) {
        return next(new AppError('Email alread exist', 409));
    }

    const user = await USER.create({
        fullName, email, password,
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
        }
    })

    if (!user) {
        new AppError('User registration failed, please try again later', 400)
    }

    if (req.file) {
        try {

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LearnSphere/profile/dp',
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

    return mailSendForVerify(req, res, user)
})

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Enter All details', 400))
    }

    const user = await USER.findOne({ email }).select('+password')

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
        msg: 'User logged in successfully',
        user
    })


})

export const getLoggedInUserDetails = asyncHandler(async (req, res, next) => {
    // Finding the user using the id from modified req object
    const role = req.user.role;
    let user;
    if (role === 'ADMIN') {
        user = await ADMIN.findById(req.user.id)
    }
    else if (role === 'INST') {
        user = await INST.findById(req.user.id)

    }
    else if (role === 'USER') {
        user = await USER.findById(req.user.id);
    }
    else {
        return next(new AppError('server error'))
    }

    res.status(200).json({
        success: true,
        msg: 'User details',
        user,
    });
});

export const verifyUser = asyncHandler(async (req, res, next) => {
    const { verify_token } = req.params;

    if (!verify_token) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    const decoded = await jwt.verify(verify_token, process.env.JWT_SECRET);

    if (!decoded) {
        return next(new AppError("Unauthorized, please login to continue", 401));
    }

    const id = decoded.id

    const user = await USER.findById(id)
    if (!user) {
        return next(new AppError('No user exist with this email ', 400))
    }
    if (user && user.isVerified) {
        return res.status(200).json({
            success: true,
            msg: 'User already verified '
        })
    }

    user.isVerified = true;

    await user.save()

    user.password = undefined;

    res.status(200).json({
        success: true,
        msg: 'user verify successfully , please re login',
    })
})

export const logoutUser = asyncHandler(async (_req, res, _next) => {
    // Setting the cookie value to null
    res.cookie('auth_token', null, {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 0,
        httpOnly: true,
        sameSite: 'None',
    });

    // Sending the response
    res.status(200).json({
        success: true,
        msg: 'User logged out successfully',
    });
});


export const forgotPassword = asyncHandler(async (req, res, next) => {
    // Extracting email from request body
    const { email } = req.body;
   
    // If no email send email required message
    if (!email) {
        return next(new AppError('Email is required', 400));
    }
    if(email === 'test@gmail.com'){
        return next(new AppError('Your are in test mode',401))
    }
    // Finding the user via email
    const user = await USER.findOne({ email });

    // If no email found send the message email not found
    if (!user) {
        return next(new AppError('Email not registered', 400));
    }

    // Generating the reset token via the method we have in user model
    const resetToken = await user.generatePasswordResetToken();

    // Saving the forgotPassword* to DB
    await user.save();

    // constructing a url to send the correct data
    /**HERE
     * req.protocol will send if http or https
     * req.get('host') will get the hostname
     * the rest is the route that we will create to verify if token is correct or not
     */
    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/user/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // We here need to send an email to the user with the token
    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a> it is valid only for 15 min<br /> <br />If the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.</br > </br> If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);

        // If email sent successfully send the success response
        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`,
        });
    } catch (error) {
        // If some error happened we need to clear the forgotPassword* fields in our DB
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save();

        return next(
            new AppError(
                error.message || 'Something went wrong, please try again.',
                500
            )
        );
    }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
    // Extracting resetToken from req.params object
    const { resetToken } = req.params;

    // Extracting password from req.body object
    const { password, confirmPassword } = req.body;

    // We are again hashing the resetToken using sha256 since we have stored our resetToken in DB using the same algorithm
    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Check if password is not there then send response saying password is required
    if (!password || !confirmPassword) {
        return next(new AppError('Enter All details', 400));
    }

    if (password !== confirmPassword) {
        return next(new AppError('Password and ConfirmPassword must be same', 400))
    }


    // Checking if token matches in DB and if it is still valid(Not expired)
    const user = await USER.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }, // $gt will help us check for greater than value, with this we can check if token is valid or expired
    });

    // If not found or expired send the response
    if (!user) {
        return next(
            new AppError('Token is invalid or expired, please try again', 400)
        );
    }

    // Update the password if token is valid and not expired
    user.password = password;

    // making forgotPassword* valus undefined in the DB
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    // Saving the updated user values
    await user.save();

    // Sending the response when everything goes good
    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
});

export const changePassword = asyncHandler(async (req, res, next) => {

    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { id } = req.user; // because of the middleware isLoggedIn
    let role = req.user.role

    // Check if the values are there or not
    if (!oldPassword || !newPassword || !confirmPassword) {
        return next(
            new AppError('Enter all the details', 400)
        );
    }
    if (newPassword !== confirmPassword) {
        return next(new AppError("Pleae , confirm your new Password "), 400);
    }

    // Finding the user by ID and selecting the password
    let user;
    if (role === 'USER') {
        user = await USER.findById(id).select('+password');

    }
    else if (role === 'INST') {

        user = await INST.findById(id).select('+password');
    }
    else if(role === 'ADMIN'){
        user = await ADMIN.findById(id).select('+password')
    }

    // If no user then throw an error message
    if (!user) {
        return next(new AppError('Invalid user id or user does not exist', 400));
    }
    if(user.email === 'test@gmail.com'){
        return next(new AppError('Your are in test mode',401))
    }
    // Check if the old password is correct
    const isPasswordValid = await user.comparePassword(oldPassword);

    // If the old password is not valid then throw an error message
    if (!isPasswordValid) {
        return next(new AppError('Invalid old password', 400));
    }

    if ((await user.comparePassword(newPassword))) {
        return next(new AppError('old passsword and new password must be diffrent', 400));
    }

    // Setting the new password
    user.password = newPassword;

    // Save the data in DB
    await user.save();

    // Setting the password undefined so that it won't get sent in the response
    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
});

export const adminChangePassword = asyncHandler(async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    const { id } = req.params;

    if (!id || !password || !confirmPassword) {
        return next(new AppError('Enter All details', 400))
    }

    if (password !== confirmPassword) {
        return next(new AppError('password and confirm password must be same', 400))
    }
    const user = await USER.findById(id).select('+password');

    if (!user) {
        return next(new AppError('user not exist', 400))
    }
    user.password = password;
    await user.save();

    user.password = undefined;

    res.status(200).json({ success: true, msg: 'password change successfuly' })


})


export const updateUser = asyncHandler(async (req, res, next) => {
    // Destructuring the necessary data from the req object
    const { fullName } = req.body;
    const id = req.user.id

    const role = req.user.role;
    let user;

    if (role === 'USER') {
        user = await USER.findById(id);
    }

    else if (role === 'ADMIN') {
        user = await ADMIN.findById(id);
    }
    else if (role === 'INST') {
        user = await INST.findById(id)
    }

    if (!user) {
        return next(new AppError('Invalid user id or user does not exist'));
    }

    if(user.email === 'test@gmail.com'){
        return next(new AppError('Your are in test mode',401))
    }

    if (fullName) {
        user.fullName = fullName;
    }

    // Run only if user sends a file
    if (req.file) {
        // Deletes the old image uploaded by the user
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms', // Save files in a folder named lms
                width: 250,
                height: 250,
                gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
                crop: 'fill',
            });

            // If success
            if (result) {
                // Set the public_id and secure_url in DB
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // After successful upload remove the file from local storage
                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 400)
            );
        }
    }

    // Save the user object
    await user.save();

    res.status(200).json({
        success: true,
        msg: 'User details updated successfully',
    });
});