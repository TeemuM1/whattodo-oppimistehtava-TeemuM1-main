import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoute from './routes/taskRoute';
import connectWithRetry from "./config/db";

const app = express();

connectWithRetry();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use('/api', taskRoute);

app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url}`);
    next();
})

export default app;