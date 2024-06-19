// src/server.ts
import app from './app';
import { config } from './config/config';
import logger from './utils/logger';
import connectDB from './config/db'; // Adjust the path as needed

const PORT = config.port;



// Call connectDB function to connect to MongoDB
connectDB()
    .then(() => {
        // console.log('Database Connected')
        // Start your Express server or perform other actions upon successful connection
        // For example: app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Error connecting to database:', err));

const server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
    logger.info(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
