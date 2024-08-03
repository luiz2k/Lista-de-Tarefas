import { Types } from "mongoose";

import type { ITaskRepository } from "../../repositories/interfaces/ITaskRepository";
import type { TaskInput, TaskOutput, UpdateTaskInput } from "../../types/task";

export class TaskRepository implements ITaskRepository {
	tasks: TaskOutput[] = [];

	async create(data: TaskInput): Promise<TaskOutput> {
		const task = {
			_id: new Types.ObjectId(),
			userId: new Types.ObjectId(data.userId),
			task: data.task,
			completed: false,
			createdAt: new Date(),
		};

		this.tasks.push(task);

		return task;
	}

	async findOne(id: string): Promise<TaskOutput | null> {
		const task = this.tasks.find((task) => String(task._id) === id);

		return task || null;
	}

	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = this.tasks.filter((task) => String(task.userId) === userId);

		return tasks;
	}

	async update(id: string, data: UpdateTaskInput): Promise<void> {
		const objectId = new Types.ObjectId(id);

		const updatedTask = this.tasks.map((task) => {
			if (String(task._id) === String(objectId)) {
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
		const objectId = new Types.ObjectId(id);

		const taskIndice = this.tasks.findIndex(
			(elemento) => elemento._id === objectId,
		);

		this.tasks.splice(taskIndice, 1);
	}
}
