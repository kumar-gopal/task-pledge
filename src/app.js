// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsConfig.js';
import { apiversioning } from './middleware/apiVersioning.js';
import { requestLogger, addTimeStamp } from './middleware/customLogger.js';
import CustomRateLimiter from './middleware/rateLimiting.js';
import AppError from './utils/customAppError.js';

import globalErrorHandler from './middleware/globalErrorHandler.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(corsOptions);
app.use(apiversioning("v1"));
app.use(requestLogger);
app.use(addTimeStamp);
app.use(CustomRateLimiter(60, 10 * 60 * 1000)); // 60 req per 10min

// Route fallback handler
app.all('/{*any}', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
