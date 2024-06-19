import {Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    matchPasswords(password: string): Promise<boolean>;
    getSignedJwtToken(): string;
    getResetPasswordToken(): string;
}