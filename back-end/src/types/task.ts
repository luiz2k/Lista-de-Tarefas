export enum TaskStatus {
	Pending = "pending",
	Completed = "completed",
}

export type TaskInput = {
	userId: string;
	task: string;
};

export type TaskOutput = {
	id: string;
	task: string;
	status: TaskStatus;
	createdAt: Date;
	user: {
		id: string;
	};
};

export type UpdateTaskInput = {
	task?: string;
	status?: TaskStatus;
};
