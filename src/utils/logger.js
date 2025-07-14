import winston from 'winston';
import fs from "fs";
import path from 'path';
import { config } from '../config/envConfig.js';

const isProduction = config.get('nodeEnv');

// Log directory path
const logDir = path.join('logs');


// check log directory exists 
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// ensure log files exist
const logFiles = ['combined.log', 'error.log'];

logFiles.forEach(file => {
    const filePath = path.join(logDir, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', { flag: 'w' }); // create empty file
    }
})


const logger = winston.createLogger({
    level: isProduction ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        isProduction
            ? winston.format.json()
            : winston.format.printf(({ timestamp, level, message, stack }) => {
                return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
            })
    ),
    defaultMeta: { service: 'Task-Pledge WEB APP' },
    transports: [
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
        }),
    ],
});

// ✅This logger only in development
if (isProduction === 'DEVELOPMENT') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

export default logger;
