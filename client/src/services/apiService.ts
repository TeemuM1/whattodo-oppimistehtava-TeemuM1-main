import axios, { AxiosError, AxiosResponse } from "axios";
import { Task } from "../models/TaskModels";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 5000, 
});

export async function getTasks() {
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