import { Router } from "express";
import { getTask } from '../controllers/TaskController'
import { createTask } from '../controllers/TaskController'

const router = Router();

router.get('/tasks',getTask);

router.post("/tasks", createTask);

export default router;