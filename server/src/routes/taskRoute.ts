import { Router } from "express";
import { getTask } from '../controllers/TaskController'

const router = Router();

router.get('/tasks',getTask);

export default router;