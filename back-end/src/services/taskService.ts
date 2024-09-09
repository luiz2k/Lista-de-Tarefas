import { NotFoundError } from "../helpers/errorHandler";

import type { ITaskRepository } from "../repositories/interfaces/ITaskRepository";
import type { TaskInput, TaskOutput, UpdateTaskInput } from "../types/task";
import type { ITaskService } from "./interfaces/ITaskService";

// Serviço de tarefas
export class TaskService implements ITaskService {
	constructor(private readonly taskRepository: ITaskRepository) {}

	// Cria uma nova tarefa
	async create(data: TaskInput): Promise<TaskOutput> {
		const task = await this.taskRepository.create(data);

		return task;
	}

	// Encontra uma tarefa
	async findOne(id: string, userId: string): Promise<TaskOutput | null> {
		const task = await this.taskRepository.findOne(id);

		// Se a tarefa não existir retorna um erro
		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		// Se a tarefa pertencer à outro usuário retorna um erro
		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		return task;
	}

	// Encontra todas as tarefas
	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = await this.taskRepository.findAll(userId);

		return tasks;
	}

	// Atualiza uma tarefa
	async update(
		id: string,
		userId: string,
		data: UpdateTaskInput,
	): Promise<void> {
		const task = await this.taskRepository.findOne(id);

		// Se a tarefa não existir retorna um erro
		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		// Se a tarefa pertencer à outro usuário retorna um erro
		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		await this.taskRepository.update(id, data);
	}

	// Remove uma tarefa
	async remove(id: string, userId: string): Promise<void> {
		const task = await this.taskRepository.findOne(id);

		// Se a tarefa não existir retorna um erro
		if (!task) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		// Se a tarefa pertencer à outro usuário retorna um erro
		if (task.user.id !== userId) {
			throw new NotFoundError("Tarefa não encontrada.");
		}

		await this.taskRepository.remove(id);
	}
}
