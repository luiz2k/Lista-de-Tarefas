import { AppDataSource } from "../database/data-source.js";
import { Task } from "../database/entities/taskEntity.js";
import { User } from "../database/entities/userEntity.js";

import type { TaskInput, TaskOutput, UpdateTaskInput } from "../types/task.js";
import type { ITaskRepository } from "./interfaces/ITaskRepository.js";

export class TaskRepository implements ITaskRepository {
	taskRepository = AppDataSource.getRepository(Task);
	userRepository = AppDataSource.getRepository(User);

	async create(data: TaskInput): Promise<TaskOutput> {
		const { userId, ...rest } = data;

		const task = this.taskRepository.create({
			user: { id: userId },
			...rest,
		});

		await this.taskRepository.save(task);

		return task;
	}

	async findOne(id: string): Promise<TaskOutput | null> {
		const task = await this.taskRepository.findOne({
			where: {
				id,
			},
			relations: ["user"],
			select: {
				user: {
					id: true,
				},
			},
		});

		return task;
	}

	async findAll(userId: string): Promise<TaskOutput[]> {
		const tasks = await this.taskRepository.find({
			where: {
				user: {
					id: userId,
				},
			},
		});

		return tasks;
	}

	async update(id: string, data: UpdateTaskInput): Promise<void> {
		await this.taskRepository.update(id, data);
	}

	async remove(id: string): Promise<void> {
		await this.taskRepository.delete(id);
	}
}
