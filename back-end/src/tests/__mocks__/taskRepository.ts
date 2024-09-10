import { randomUUID } from "node:crypto";

import type { ITaskRepository } from "../../repositories/interfaces/ITaskRepository";
import {
	type TaskInput,
	type TaskOutput,
	TaskStatus,
	type UpdateTaskInput,
} from "../../types/task";

export class TaskRepository implements ITaskRepository {
	tasks: TaskOutput[] = [];

	async create(data: TaskInput): Promise<TaskOutput> {
		const task = {
			id: randomUUID(),
			task: data.task,
			status: TaskStatus.Pending,
			createdAt: new Date(),
			user: {
				id: data.userId,
			},
		};

		this.tasks.push(task);

		return task;
	}

	async findOne(id: string): Promise<TaskOutput | null> {
		const task = this.tasks.find((task) => task.id === id);

		return task || null;
	}

	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = this.tasks.filter((task) => task.user.id === userId);

		return tasks;
	}

	async update(id: string, data: UpdateTaskInput): Promise<void> {
		const updatedTask = this.tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					...data,
				};
			}

			return task;
		});

		this.tasks = updatedTask;
	}

	async remove(id: string): Promise<void> {
		const taskIndice = this.tasks.findIndex((elemento) => elemento.id === id);

		this.tasks.splice(taskIndice, 1);
	}
}
