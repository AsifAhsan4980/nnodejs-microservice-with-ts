// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import errorHandler from "./middlewares/error";
import routes from './routes';
import logger from './utils/logger';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);
app.use('/api/users', userRoutes);


app.use(errorHandler);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).send('Internal Server Error');
});

export default app;
