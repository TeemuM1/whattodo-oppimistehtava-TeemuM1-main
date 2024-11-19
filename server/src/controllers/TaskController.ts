import { Request, Response } from 'express';
import Task from '../models/taskModel';

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
    res.status(500).json({message: "Task couldn't be saved!"});
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
      const { name } = req.params;
      console.log(`Attempting to delete task: ${name}`);
      const task = await Task.findOneAndDelete({name});

      if (!task) {
        console.log("Task not found");
          return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
      res.status(500).json({ message: "Error deleting task", error });
  }
};

export const editTask = async (req: Request, res: Response) => {
  const { originalName, ...updatedData } = req.body;

  try {
      // Find the task by its original name
      const task = await Task.findOne({ name: originalName });
      if (!task) {
          return res.status(404).json({ message: "Task not found" });
      }

      // Update the task with the new data
      Object.assign(task, updatedData);
      await task.save();

      return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ message: "Error updating task", error });
  }
};