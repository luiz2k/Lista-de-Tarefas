export type CreateTask = {
	task: string;
};

export type UpdateTask = {
	task?: string;
	completed?: boolean;
};

export type Task = {
	_id: string;
	userId: string;
	task: string;
	completed: boolean;
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
