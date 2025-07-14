import "dotenv/config";
import { config } from "./config/envConfig.js";
import dbConnection from "./config/dbconfig.js";
import logger from "./utils/logger.js";
import app from "./app.js";

const PORT = config.get('port') || 3001;

// Start server
const server = app.listen(PORT, async () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  await dbConnection();
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error(`❌ Uncaught Exception: ${err.message}`);
  server.close(() => process.exit(1));
});
