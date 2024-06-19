import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {IUser} from "../types/types";

// Interface for User document


// Schema definition
const UserSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*? ])[A-Za-z\d#$@!%&*?]{8,30}$/,
            'Please provide a valid password',
        ],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
});

// Middleware to hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
UserSchema.methods.matchPasswords = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
UserSchema.methods.getSignedJwtToken = function (): string {
    return jwt.sign({
        id: this._id,
        email: this.email,
    }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRE as string,
    });
};

// Method to generate reset password token
UserSchema.methods.getResetPasswordToken = function (): string {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set token expire date
    this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // Ten Minutes

    return resetToken;
};

// Create model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
