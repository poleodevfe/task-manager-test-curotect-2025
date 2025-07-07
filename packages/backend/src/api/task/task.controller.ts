import type { Request, Response } from 'express';
import * as TaskService from './task.service';

export const getAllTasksController = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error getting tasks', error });
  }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const task = await TaskService.getTaskById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting task', error });
  }
};

export const createNewTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ message: 'Title is required' });
    }
    const newTask = await TaskService.createTask(title, description);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedTask = await TaskService.updateTask(id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await TaskService.deleteTask(id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
