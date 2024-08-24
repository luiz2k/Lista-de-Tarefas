import type { TaskInput, TaskOutput, UpdateTaskInput } from "../../types/task";

export interface ITaskRepository {
	create(data: TaskInput): Promise<TaskOutput>;

	findOne(id: string): Promise<TaskOutput | null>;

	findAll(userId: string): Promise<TaskOutput[]>;

	update(id: string, data: UpdateTaskInput): Promise<void>;

	remove(id: string): Promise<void>;
}
