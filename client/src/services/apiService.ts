import axios, { AxiosError, AxiosResponse } from "axios";
import { Task, Category } from "../models/TaskModels";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

export async function getTasks(): Promise<Task[]> {
  try {
    const response: AxiosResponse = await apiClient.get("/tasks");
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error fetching tasks: ${err.response?.data}`);
  }
}

export async function createTask(newTask: Task) {
  try {
    console.log("Raw task data:", newTask);
    const processedTask = {
      ...newTask,
      category: typeof newTask.category === "object" && newTask.category !== null
        ? { id: newTask.category._id } 
        : typeof newTask.category === "string"
        ? { id: newTask.category }
        : null,
    };
    
    console.log("Processed task data:", processedTask);
    
    const response: AxiosResponse = await apiClient.post("/tasks", processedTask);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Full error:", error);
    throw new Error(`Error creating task: ${err.response?.data}`);
  }
}


export const deleteTask = async (taskName: string) => {
  const url = `/tasks/${encodeURIComponent(taskName)}`;
  const response = await apiClient.delete(url);
  return response.data;
};

export const editTask = async (originalName: string, task: Task): Promise<Task> => {
  try {
    const response: AxiosResponse = await apiClient.put(
      `/tasks/${encodeURIComponent(originalName)}`,
      {
        originalName,
        ...task,
        category: task.category && typeof task.category === "object"
          ? task.category._id
          : task.category || null, 
      }
    );
    return response.data.task;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error updating task:", err);
    throw new Error(`Error updating task: ${err.response?.data}`);
  }
};


export async function getCategories(): Promise<Category[]> {
  try {
    const response: AxiosResponse = await apiClient.get("/categories");
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error fetching categories: ${err.response?.data}`);
  }
}


export async function createCategory(name: string): Promise<Category> {
  try {
    const response: AxiosResponse = await apiClient.post("/categories", { name });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error creating category: ${err.response?.data}`);
  }
}

export async function getFilteredTasks(filters: {
  name?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}): Promise<Task[]> {
  try {
    const params = new URLSearchParams(filters as Record<string, string>);
    const response: AxiosResponse = await apiClient.get(`/tasks?${params.toString()}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(`Error fetching filtered tasks: ${err.response?.data}`);
  }
}


