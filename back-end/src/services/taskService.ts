import { NotFoundError } from "../helpers/errorHandler";

import type { ITaskRepository } from "../repositories/interfaces/ITaskRepository";
import type { TaskInput, TaskOutput, UpdateTaskInput } from "../types/task";
import type { ITaskService } from "./interfaces/ITaskService";

export class TaskService implements ITaskService {
	constructor(private readonly taskRepository: ITaskRepository) {}

	async create(data: TaskInput): Promise<TaskOutput> {
		const task = await this.taskRepository.create(data);

		return task;
	}

	async findOne(id: string, userId: string): Promise<TaskOutput | null> {
		const task = await this.taskRepository.findOne(id);

		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		return task;
	}

	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = await this.taskRepository.findAll(userId);

		return tasks;
	}

	async update(
		id: string,
		userId: string,
		data: UpdateTaskInput,
	): Promise<void> {
		const task = await this.taskRepository.findOne(id);

		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		await this.taskRepository.update(id, data);
	}

	async remove(id: string, userId: string): Promise<void> {
		const task = await this.taskRepository.findOne(id);

		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		await this.taskRepository.remove(id);
	}
}
