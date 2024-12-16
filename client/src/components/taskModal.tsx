import React, { useEffect, useState } from 'react';
import { Task, TaskStatusEnum, Category } from "../models/TaskModels";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialData?: Partial<Task>;
  mode: "create" | "edit";
  categories: Category[];
  selectedCategory: Category | null;
  onAddCategory: (categoryName: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  mode,
  categories,
  selectedCategory: initialSelectedCategory,
  onAddCategory,
}) => {
  const [name, setName] = useState<string>(initialData.name || "");
  const [content, setContent] = useState<string>(initialData.content || "");
  const [startDate, setStartDate] = useState<string>(
    initialData.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState<string>(
    initialData.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : ""
  );
  const [status, setStatus] = useState<TaskStatusEnum>(
    initialData.status || TaskStatusEnum.NEW
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialSelectedCategory ? String(initialSelectedCategory._id) : ""
  );
  const [newCategoryName, setNewCategoryName] = useState<string>("");


  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setContent(initialData?.content || "");
      setStartDate(
        initialData?.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        initialData?.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : ""
      );
      setStatus(initialData?.status || TaskStatusEnum.NEW);
      setSelectedCategory(initialSelectedCategory?._id ? initialSelectedCategory._id: ""); 
    }
  }, [isOpen, initialData, initialSelectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategoryObject = selectedCategory
        ? categories.find((cat) => cat._id === selectedCategory) || null
        : null;
        console.log("Selected category before submission:", selectedCategory);

    const updatedTask: Task = {
        ...initialData,
        name,
        content,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        category: selectedCategoryObject?._id || null,
    };

    

    onSubmit(updatedTask);
    onClose();
};

  const handleNewCategoryCreation = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName(""); 
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create Task" : "Edit Task"}
          </h2>
          <button
            className="btn btn-sm btn-circle btn-error"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tehtävän nimi */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Task Name:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter task name"
              required
            />
          </div>

          {/* Tehtävän sisältö */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Content:</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Enter task content"
              required
            />
          </div>

          {/* Aloituspäivän valinta */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Start Date:</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Loppupäivämäärän valinta */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">End Date:</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Status Dropdown -menu */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Status:</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatusEnum)}
              className="select select-bordered w-full"
            >
              <option value={TaskStatusEnum.NEW}>New</option>
              <option value={TaskStatusEnum.INPROGRESS}>In Progress</option>
              <option value={TaskStatusEnum.DONE}>Completed</option>
            </select>
          </div>

          {/* Kategoria dropdown -menu */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Category:</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                console.log("Selected category ID:", e.target.value);
              }}
              className="select select-bordered w-full"
              >
              <option value="">None</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Uuden kategorian luonti */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">New Category:</span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="input input-bordered w-full mr-2"
                placeholder="Enter new category"
              />
              <button
                type="button"
                onClick={handleNewCategoryCreation}
                className="btn btn-sm btn-primary"
              >
                Add Category
              </button>
            </div>
          </div>

          {/* Luo tehtävä */}
          <button type="submit" className="btn btn-primary w-full">
            {mode === "create" ? "Create Task" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
