import type { Types } from "mongoose";

export type TaskInput = {
	userId: string;
	task: string;
};

export type TaskOutput = {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	task: string;
	completed: boolean;
	createdAt: Date;
};

export type UpdateTaskInput = {
	task?: string;
	completed?: boolean;
};
