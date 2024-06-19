import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/auth'; // Adjust the path as needed
import ErrorResponse from '../utils/errorResponse'; // Adjust the path as needed
import Token from '../models/token';
interface DecodedToken {
    id: string;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        const user = await User.findById(decoded.id);
        const blacklist = await Token.find({ token: token });

        if (!user) {
            return next(new ErrorResponse('No user found with this id', 404));
        }

        if (blacklist.length !== 0) {
            return next(new ErrorResponse('Not authorized', 401));
        }

        req.user = user;
        next();
    } catch (err) {
        return next(new ErrorResponse('User not found', 401));
    }
};

export default protect;
