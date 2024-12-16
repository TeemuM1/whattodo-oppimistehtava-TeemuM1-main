import { Request, Response } from 'express';
import Task from '../models/taskModel';
import Category from '../models/category'; 

export const createTask = async (req: Request, res: Response) => {

  try {
    console.log("Received task data:", req.body);
    const { name, content, startDate, endDate, status, category } = req.body;
    
    // Vahvistetaan kategoria
    let categoryId = null;
    if (category && category.id) {
      categoryId = category.id;
    }

    const newTask = new Task({
      name,
      content,
      startDate,
      endDate,
      status,
      category: categoryId // Varastoidaan kategorian ID tai Null
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Task creation error:", error);
    res.status(500).json({ message: "Error creating task", error });
  }
};


export const editTask = async (req: Request, res: Response) => {
  try {
    const { originalName, category, ...updatedData } = req.body;


    if (category) {
      const categoryId = typeof category === 'object' ? category._id : category; // Käsitellään koko objekti sekä ID
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      updatedData.category = categoryId; //Annetaan validi kategorian ID
    }

    const task = await Task.findOne({ name: originalName });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //Päivitetään tehtävän kentät ja tallennetaan
    Object.assign(task, updatedData);
    const updatedTask = await task.save();

    //Haetaan päivitetty tehtävä kategorian kera.
    const populatedTask = await Task.findById(updatedTask._id).populate("category", "name");
    return res.status(200).json({ task: populatedTask });
    
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Error updating task", error });
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

export const getTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, startDate, endDate, status, sortBy, sortOrder, search } = req.query;

    if (search && typeof search !== "string"){
      return res.status(400).json({ error: "Invalid search parameter"});
    }
    //Rakennetaan hakuobjekti
    const query: any = {};

    if (search) {
      query.name = { $regex: escapeRegExp(search as string), $options: "i"};
    }

    if (name) {
      query.name = { $regex: name, $options: "i" }; //Ei välitetä onko nimi isolla vai pienellä kirjaimella.
    }

    if (startDate) {
      query.startDate = { $gte: new Date(startDate as string) };
    }

    if (endDate) {
      query.endDate = { $lte: new Date(endDate as string) };
    }

    if (status) {
      query.status = status;
    }

    //Rakennetaan järjestysobjekti
    const sort: any = {};
    if (sortBy) {
      sort[sortBy as string] = sortOrder === "desc" ? -1 : 1;
    }

    const tasks = await Task.find(query).populate("category").sort(sort);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks with filtering/sorting:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}