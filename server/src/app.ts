import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoute from './routes/taskRoute';
import connectWithRetry from "./config/db";
import Category from './models/category';

const app = express();

const seedCategories = async () => {
    const categories = [
        "Work",
        "Personal",
        "Urgent"
    ];
    for (const name of categories) {
        await Category.findOneAndUpdate({ name }, { name }, { upsert: true });
    }
    console.log("Preset categories seeded!");
};
seedCategories();


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