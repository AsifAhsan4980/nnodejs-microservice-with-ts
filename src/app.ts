// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import errorHandler from "./middlewares/error";
import passport from "passport";
import cors from "cors";

import logger from './utils/logger';

//routes import
import routes from './routes';
import userRoutes from './routes/userRoutes';
import logOut from "./routes/logout";
import authRoutes from "./routes/authRoutes";

//cors setup
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

//express setup
const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended : true}))
app.use(passport.initialize(undefined));
app.use(bodyParser.json());

//routes
app.use('/api', routes);
app.use('/api/users', userRoutes);
app.use('/auth',authRoutes)
app.use('/logout',logOut)

//error handler
app.use(errorHandler);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    res.status(500).send('Internal Server Error');
});

export default app;
