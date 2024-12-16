import { Request, Response } from "express";
import { Router } from "express";
import { getTask } from '../controllers/TaskController'
import { createTask, deleteTask, editTask } from '../controllers/TaskController'
import { getCategories, createCategory } from "../controllers/CategoryController";

const router = Router();

router.get('/tasks', getTask);

router.post('/tasks', createTask);

router.get('/categories', getCategories)

router.post('/categories', async (req: any, res: any) => {
    await createCategory(req, res);
  });


router.delete('/tasks/:name', async (req: Request, res: Response) => {
    await deleteTask(req, res);
});

router.put('/tasks/:name', async (req: Request, res: Response) => {
    await editTask(req, res)
});

export default router;
