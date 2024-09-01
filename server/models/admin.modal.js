
import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const adminSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name , required'],
        minlength: [5, 'Name must be at least 5 characters'],
        lowercase: true,
        trime: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ], // Matches email against regex
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false, // Will not select password upon looking up a document
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
    role: {
        type: String,
        enum: ['ADMIN'],
        default: 'ADMIN',
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

},
    {
        timestamps: true,
    }
);

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
})

adminSchema.methods = {

    generateJWTToken: async function () {
        return await jwt.sign(
            { id: this._id , role:this.role},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );
    },
    generateVerifyToken : async function(){
        return await jwt.sign(
            { id: this._id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.VERIFY_TOKEN_EXPIRY,
            }
        );
    },
    comparePassword: async function (plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    },
    generatePasswordResetToken: async function () {
        // creating a random token using node's built-in crypto module
        const resetToken = crypto.randomBytes(20).toString('hex');
    
        // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
        this.forgotPasswordToken = crypto
          .createHash('sha256')
          .update(resetToken)
          .digest('hex');
    
        // Adding forgot password expiry to 15 minutes
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
    
        return resetToken;
      },
}


const ADMIN = model('admins', adminSchema);

export default ADMIN;