import type { Request, Response } from 'express';
import * as TaskService from './task.service';

export const getAllTaskController = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error getting all tasks', error });
  }
};
