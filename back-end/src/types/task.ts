export type TaskInput = {
	userId: string;
	task: string;
};

export type TaskOutput = {
	id: string;
	task: string;
	completed: boolean;
	createdAt: Date;
	user: {
		id: string;
	};
};

export type UpdateTaskInput = {
	task?: string;
	completed?: boolean;
};
