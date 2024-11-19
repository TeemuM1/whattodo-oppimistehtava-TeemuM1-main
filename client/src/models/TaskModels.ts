export type TaskListModel = {
    tasks: Task[] | null;
}

export enum TaskStatusEnum{
    NEW = "new",
    INPROGRESS = "inprogress",
    DONE = "done",
}

export type Task = {
    name: string;
    content: string;
    startDate?: Date |null;
    endDate?: Date | null;
    status: TaskStatusEnum;
    originalName?: string;
}


