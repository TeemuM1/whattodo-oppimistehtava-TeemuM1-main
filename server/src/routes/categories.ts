import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/CategoryController';

const router = Router();

router.get('/', getCategories)

router.post('/', async (req: any, res: any) => {
    await createCategory(req, res);
  });

export default router;