import { Request, Response, NextFunction } from 'express';
import User from '../models/auth'; // Adjust the path and import as needed
import ErrorResponse from '../utils/errorResponse';
import _ from 'lodash';
import {IUser} from "../types/types";

interface DecodedToken {
    id: string;
}

// Register user
const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as { email: string; password: string };

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already registered!' });
        }

        user = new User(_.pick(req.body, ['email', 'password']));
        await user.save();

        sendTokenResponse(user, 200, res);
    }  catch (err) {
        if (err instanceof Error) {
            return next(new ErrorResponse(err.message, 500));
        }
        return next(err);
    }
};

// Login user
const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as { email: string; password: string };

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return next(new ErrorResponse("Please provide an email and password", 400));
        }

        // Check if user exists
        const user = await User.findOne({ email }).select("+password") as IUser;

        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }


        // Check if password matches
        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Send token response
        sendTokenResponse(user, 200, res);
    } catch (err) {
        if (err instanceof Error) {
            return next(new ErrorResponse(err.message, 401));
        }
        return next(err);
    }
};

// Function to send JWT token as a cookie
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
    const token = user.getSignedJwtToken();

    res.cookie('jwt', token, {
        httpOnly: true,
        // secure: true, // Uncomment if using HTTPS
        // sameSite: 'none', // Uncomment if dealing with cross-site cookies
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            _id: user._id,
            email: user.email,
            // Add other user properties as needed
        }
    });
};

export default {
    register,
    login,
};
