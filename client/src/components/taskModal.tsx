import React, { useEffect, useState } from 'react';
import { Task, TaskStatusEnum } from "../models/TaskModels";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: Task) => void;
    initialData?: Partial<Task>;
    mode: "create" | "edit";
}

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData= {},
    mode,
}) => {
    const [name, setName] = useState<string>(initialData.name || "");
    const [content, setContent] = useState<string>(initialData.content || "");
    const [startDate, setStartDate] = useState<string>(
        initialData.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : ""
    );
    const [endDate, setEndDate] = useState<string>(
        initialData.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : ""
    );
    const [status, setStatus] = useState<TaskStatusEnum>(
        initialData.status || TaskStatusEnum.NEW
    );

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
        }
      }, [isOpen, initialData]);
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
          name,
          content,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          status,
        };
        onSubmit(newTask);
        onClose();
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
            {/* Modal Header */}
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
    
            {/* Form */}
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
                  <span className="label-text">Status:</span>
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as TaskStatusEnum)
                  }
                  className="select select-bordered w-full"
                  required
                >
                  <option value={TaskStatusEnum.NEW}>New</option>
                  <option value={TaskStatusEnum.INPROGRESS}>In Progress</option>
                  <option value={TaskStatusEnum.DONE}>Done</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                {mode === "create" ? "Create Task" : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      );
    };
    
    export default TaskModal;