import axios, { AxiosError, AxiosResponse } from "axios";
import { Task } from "../models/TaskModels";

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
    throw new Error(`Error fetching message: ${err.response?.data}`);
  }
}

export async function createTask(newTask: Task) {
  try {
    const response: AxiosResponse = await apiClient.post("/tasks", newTask);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
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
    const response: AxiosResponse = await apiClient.put(`/tasks/${encodeURIComponent(originalName)}`, {
      originalName,
      ...task,
    });
    return response.data.task;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error updating task:', err);
    throw new Error(`Error updating task: ${err.response?.data}`);
  }
};