export enum TaskStatus {
	Pending = "pending",
	Completed = "completed",
}

export type CreateTask = {
	task: string;
};

export type UpdateTask = {
	task?: string;
	status?: TaskStatus;
};

export type Task = {
	id: string;
	task: string;
	status: TaskStatus;
	createdAt: string;
};

export type HomeContextType = {
	tasks: Task[];
	filteredTasks: Task[];
	searchParam: string | null;
	search: string;
	handleSearch: (search: string) => void;
	tasksFound: Task[];
};
