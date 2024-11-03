import { Request, Response } from 'express';

const exampleTaskList: string[] = ["Task1", "Task2", "Task3", "Task4"];

export const getTask = (req: Request, res: Response) => {
  res.json({ tasks: exampleTaskList });
};

