import mongoose from "mongoose";
import {config} from "./envConfig.js";
import logger from "../utils/logger.js";


const dbConnection = async () => {
    try {
        const db = await mongoose.connect(config.get('mongouri'));
        logger.info(`✅ Connected to DB: name=${db.connection.name} and port=${db.connection.port} successfully`);
    } catch (error) {
        logger.info(`❌ Database connection failed...`);
        logger.error("err", error);
    }
}

export default dbConnection;