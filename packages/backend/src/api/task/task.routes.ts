import { Router } from 'express';
import {
  getAllTasksController,
  getTaskByIdController,
  createNewTaskController,
  updateTaskController,
  deleteTaskController,
} from './task.controller';

const router = Router();

router.get('/', getAllTasksController);
router.post('/', createNewTaskController);
router.get('/:id', getTaskByIdController);
router.put('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);

export default router;
