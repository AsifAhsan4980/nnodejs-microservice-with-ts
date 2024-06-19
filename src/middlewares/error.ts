import { Request, Response, NextFunction } from 'express';
import ErrorResponse from "../utils/errorResponse";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err };

    error.message = err.message;

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate Field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val: any) => val.message).join(', ');
        error = new ErrorResponse(message, 400);
    }

    console.log(error.message);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

export default errorHandler;
