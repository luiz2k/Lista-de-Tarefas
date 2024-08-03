import type { TaskInput, TaskOutput, UpdateTaskInput } from "../../types/task";

export interface ITaskService {
	create(data: TaskInput): Promise<TaskOutput>;

	findOne(id: string, userId: string): Promise<TaskOutput | null>;

	findAll(userId: string): Promise<TaskOutput[]>;

	update(id: string, userId: string, data: UpdateTaskInput): Promise<void>;

	remove(id: string, userId: string): Promise<void>;
}
