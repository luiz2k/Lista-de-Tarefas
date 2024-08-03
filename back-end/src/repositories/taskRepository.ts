import { Task } from "../models/taskModel";

import type { TaskInput, TaskOutput, UpdateTaskInput } from "../types/task";
import type { ITaskRepository } from "./interfaces/ITaskRepository";

export class TaskRepository implements ITaskRepository {
	async create(data: TaskInput): Promise<TaskOutput> {
		const task = await Task.create(data);

		return task;
	}

	async findOne(id: string): Promise<TaskOutput | null> {
		const task = await Task.findById(id);

		return task;
	}

	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = await Task.find({ userId });

		return tasks;
	}

	async update(id: string, data: UpdateTaskInput): Promise<void> {
		await Task.findByIdAndUpdate({ _id: id }, data);
	}

	async remove(id: string): Promise<void> {
		await Task.findByIdAndDelete({ _id: id });
	}
}
