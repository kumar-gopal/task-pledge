import AppError from '../utils/customAppError.js';
import { config } from "../config/envConfig.js";

const isProduction = config.get('nodeEnv');

// 🔹 Show full error details in development
const devErr = (req, res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stackTrace: error.stack,
        error: error,
    });
};

// 🔹 Cleaner error message in production
const prodErr = (req, res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    } else {
        // Log unexpected error
        console.error("💥 UNEXPECTED ERROR:", error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong. Please try again later.",
        });
    }
};

// ✅ MongoDB CastError (invalid ObjectId)
const castErrorHandler = (err) => {
    const msg = `Invalid ${err.path}: ${err.value}`;
    return new AppError(msg, 400);
};

// ✅ MongoDB Duplicate Key Error
const duplicateKeyErrorHandler = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const msg = `Duplicate value for "${field}": "${value}". Please use a different value.`;
    return new AppError(msg, 400);
};

// ✅ Mongoose Validation Error
const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map((val) => val.message);
    const msg = `Invalid input data: ${errors.join('. ')}`;
    return new AppError(msg, 400);
};

// ✅ Global Error Middleware
const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (isProduction === 'DEVELOPMENT') {
        return devErr(req, res, error);
    } else if (isProduction === 'PRODUCTION') {
        let customError = { ...error, name: error.name, message: error.message };

        if (error.name === "CastError") customError = castErrorHandler(error);
        if (error.code === 11000) customError = duplicateKeyErrorHandler(error);
        if (error.name === "ValidationError") customError = validationErrorHandler(error);

        return prodErr(req, res, customError);
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Environment misconfigured. Please check NODE_ENV value.',
        });
    }

};

export default globalErrorHandler;
