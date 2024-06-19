// src/server.ts
import app from './app';
import { config } from './config/config';
import logger from './utils/logger';

const PORT = config.port;

const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
    logger.info(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
