export type TaskListModel = {
    tasks: Task[] | null;
}

export type Task = {
    name: string;
    content: string;
    startDate?: Date |null;
    endDate?: Date | null;
}


