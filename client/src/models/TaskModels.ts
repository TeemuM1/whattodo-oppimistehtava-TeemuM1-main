export type TaskListModel = {
    tasks: Task[] | null;
};

export enum TaskStatusEnum {
    NEW = "new",
    INPROGRESS = "inprogress",
    DONE = "done",
}

export type Category = {
    _id: string,
    name: string;
};

export type Task = {
    name: string;
    content: string;
    startDate?: Date | null;
    endDate?: Date | null;
    status: TaskStatusEnum;
    category?: string | Category | null; // Added category property
    originalName?: string;
};


