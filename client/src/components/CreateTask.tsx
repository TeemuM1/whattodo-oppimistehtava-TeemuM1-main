import React, { useState, useEffect } from "react";
import { createTask, getCategories } from "../services/apiService";
import { Task, TaskStatusEnum, Category } from "../models/TaskModels";

interface CreateTaskProps {
  onTaskCreated: (newTask: Task) => void;
}

function CreateTask({ onTaskCreated }: CreateTaskProps) {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<TaskStatusEnum>(TaskStatusEnum.NEW);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch {
        setMessage("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    const selectedCategoryObject = selectedCategory
        ? categories.find((cat) => cat._id === selectedCategory) || null
        : null;

    const newTask: Task = {
        name,
        content,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        category: selectedCategoryObject?._id || null 
    };

    try {
        const createdTask = await createTask(newTask);
        onTaskCreated(createdTask);
        setMessage('Task created successfully');
        setName('');
        setContent('');
        setStartDate('');
        setEndDate('');
        setStatus(TaskStatusEnum.NEW);
        setSelectedCategory('');
    } catch (error) {
        console.error(error);
        setMessage('Failed to create task');
    }
};


  return (
    <div className="flex flex-col my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create New Task
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Enter task name"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Content:</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="textarea textarea-bordered w-full"
            placeholder="Enter task content"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Start Date:</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">End Date:</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Category:</span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">None</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
            </option>
         ))}
        </select>
      </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Task
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-lg font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}

export default CreateTask;
