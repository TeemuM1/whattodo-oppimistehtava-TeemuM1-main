import express from 'express';
import cors from 'cors';
import taskRoute from './routes/taskRoute';
import connectWithRetry from "./config/db";

const app = express();

connectWithRetry();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}))

app.use('/api', taskRoute);

export default app;