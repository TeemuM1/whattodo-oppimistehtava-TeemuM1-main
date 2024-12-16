import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { getTasks, deleteTask, createTask, editTask, getCategories, createCategory } from "../services/apiService";
import { Task, Category } from "../models/TaskModels";
import Notification from '../components/Notification';
import TaskModal from '../components/taskModal';
import { getFilteredTasks } from "../services/apiService";

export default function Tasks() {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);
    const [filters, setFilters] = useState({
      name: "",
      startDate: "",
      endDate: "",
      status: "",
      sortBy: "",
      sortOrder: "asc",
      search: "",
    });
    
    
    useEffect(() => {
      async function fetchTasks() {
        try {
          const data = await getTasks();
          setTaskList(data);
        } catch (error: unknown) {
          if (error instanceof Error) {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      }
  
      async function fetchCategories() {
        try {
          const categoryData = await getCategories();
          setCategories(categoryData);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        }
      }
  
      fetchTasks();
      fetchCategories();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prevFilters) => ({ ...prevFilters, search: e.target.value }));
    };
    

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };
    
    const fetchFilteredTasks = async () => {
      try {
        const filteredTasks = await getFilteredTasks(filters);
        setTaskList(filteredTasks);
      } catch (error) {
        console.error("Error fetching filtered tasks:", error);
      }
    };
    
    useEffect(() => {
      fetchFilteredTasks();
    }, [filters]);
    

    const handleOpenCreateModal = () => {
      setEditingTask(null);
      setModalMode("create");
      setIsModalOpen(true);
    };
  
    const handleOpenEditModal = (task: Task) => {
      setEditingTask(task);
      setModalMode("edit");
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSubmitTask = async (task: Task) => {
      try {
        console.log("Task being submitted:", task);
        const taskToSubmit = {
          ...task,
          category: typeof task.category === "object" ? task.category?._id : task.category,
        };
        console.log("Payload sent to editTask API:", taskToSubmit);
    
        if (modalMode === 'create') {
          const newTask = await createTask(taskToSubmit);
          setTaskList((prev) => [...prev, { ...newTask, category: categories.find((cat) => cat._id === newTask.category) }]);
    
          setNotification({ message: 'Task created successfully!', type: 'success' });
        } else if (modalMode === 'edit') {
          const updatedTask = await editTask(editingTask?.name || '', taskToSubmit);
          
          setTaskList((prev) =>
            prev.map((t) => (t.name === editingTask?.name ? updatedTask : t))
          );
    
          setNotification({ message: 'Task updated successfully!', type: 'success' });
        }
      } catch (error: unknown) {
        console.error("Full error details:", error);
        if (error instanceof Error) {
          setNotification({ message: error.message, type: 'error' });
          console.error("Detailed error message:", error.message);
        } else {
          setNotification({ message: 'An unknown error occurred.', type: 'error' });
        }
      } finally {
        setIsModalOpen(false);
      }
    };
    
    
    const handleDeleteTask = async (taskName: string) => {
      try {
        await deleteTask(taskName);
        setTaskList((prev) => prev.filter((task) => task.name !== taskName));
        setNotification({ message: "Task deleted successfully!", type: "success" });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setNotification({ message: error.message, type: "error" });
        } else {
          setNotification({ message: "Failed to delete task.", type: "error" });
        }
      }
    };
  
    const handleCreateCategory = async (categoryName: string) => {
      try {
        const newCategory = await createCategory(categoryName);
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setNotification({ message: "Category created successfully!", type: "success" });
      } catch (error: unknown) {
        setNotification({ message: "Failed to create category.", type: "error" });
      }
    };
    
    const isCategoryObject = (category: string | Category | null | undefined): category is Category => {
      return category !== null && 
             category !== undefined && 
             typeof category === 'object' && 
             '_id' in category;
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="card w-full max-w-5xl bg-base-100 shadow-xl">
          <div className="card-body">
          <div className="flex flex-wrap gap-4 mb-6">
              {/* Hakukenttä */}
              <input
                type="text"
                placeholder="Search tasks by name"
                value={filters.search}
                onChange={handleSearchChange}
                className="input input-bordered w-full md:w-1/3"
              />
            </div>
            <h2 className="card-title text-4xl font-bold text-gray-800 mb-6">
              Tasks
            </h2>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <button onClick={handleOpenCreateModal} className="btn btn-primary">
                + Create Task
              </button>
              {notification && (
                <Notification
                  message={notification.message}
                  type={notification.type}
                  onClose={() => setNotification(null)}
                />
              )}
            </div>
            {error && (
              <div className="alert alert-error shadow-lg mb-4">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <TaskList
                  taskList={taskList}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleOpenEditModal}
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Suodatus nimen perusteella */}
                <input
                  type="text"
                  name="name"
                  placeholder="Filter by name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="input input-bordered"
                />

                {/* Suodatus aloituspäivämäärällä */}
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="input input-bordered"
                />

                {/* Suodatus loppupäivämäärällä */}
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="input input-bordered"
                />

                {/* Suodatus statuksen mukaan */}
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="select select-bordered"
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                {/* Valinnat minkä mukaan järjestetään */}
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="select select-bordered"
                >
                  <option value="">Sort By</option>
                  <option value="name">Name</option>
                  <option value="startDate">Start Date</option>
                  <option value="endDate">End Date</option>
                  <option value="category">Category</option>
                </select>

                {/* Järjestyksen suunta */}
                <select
                  name="sortOrder"
                  value={filters.sortOrder}
                  onChange={handleFilterChange}
                  className="select select-bordered"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
          </div>
        </div>
        
  
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitTask}
          initialData={editingTask || {}}
          mode={modalMode}
          categories={categories}
          selectedCategory={
            editingTask?.category && isCategoryObject(editingTask.category)
              ? categories.find(cat => cat._id === (editingTask.category as Category)._id) || null
              : null
          }
          onAddCategory={handleCreateCategory}
        />
      </div>
    );
  }