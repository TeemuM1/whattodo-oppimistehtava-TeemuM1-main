import { Request, Response } from 'express';
import Task from '../models/taskModel';

// const exampleTaskList: string[] = ["Task1", "Task2", "Task3", "Task4"];

export const getTask = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error: unknown) {
    res.status(500).json({message: "Could not get tasks from database"})
  }
};

export const createTask = async (req: Request, res: Response) => {
  const{ name, content, startDate, endDate } = req.body;

  try {
    const task = new Task ({
      name,
      content,
      startDate,
      endDate,
    });
    
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error: unknown) {
    res.status(500).json({message: "Task couldn't be saved!", error});
  }
};