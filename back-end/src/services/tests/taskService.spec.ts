import { Types } from "mongoose";
import { TaskService } from "../taskService";

import type { ITaskRepository } from "../../repositories/interfaces/ITaskRepository";
import type { TaskInput, TaskOutput, UpdateTaskInput } from "../../types/task";
import type { ITaskService } from "../interfaces/ITaskService";

class TaskRepository implements ITaskRepository {
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

describe("TaskService", () => {
	let taskRepository: TaskRepository;
	let taskService: ITaskService;

	beforeEach(() => {
		taskRepository = new TaskRepository();
		taskService = new TaskService(taskRepository);
	});

	describe("create", () => {
		it("Deve criar uma task", async () => {
			const data = {
				userId: String(new Types.ObjectId()),
				task: "Tarefa 1",
			};

			const task = await taskService.create(data);

			expect(task).toMatchObject(taskRepository.tasks[0]);
		});

		it("Deve ocorrer um erro se o ID do usuário for inválido", async () => {
			const data = {
				userId: "1",
				task: "Tarefa 1",
			};

			await expect(taskService.create(data)).rejects.toThrow();
		});
	});

	describe("findOne", () => {
		it("Deve encontrar uma task", async () => {
			const data = {
				userId: String(new Types.ObjectId()),
				task: "Tarefa 1",
			};

			const newTask = await taskService.create(data);

			const task = await taskService.findOne(
				newTask._id.toString(),
				data.userId,
			);

			expect(task).toEqual(newTask);
			expect(task).toMatchObject(taskRepository.tasks[0]);
		});

		it("Deve ocorrer um erro se a task não for encontrada", async () => {
			await expect(taskService.findOne("1", "1")).rejects.toThrow();
			await expect(taskService.findOne("2", "2")).rejects.toThrow(
				"Tarefa não encontrada.",
			);
		});
	});

	describe("findAll", () => {
		it("Deve encontrar todas as tasks", async () => {
			const userId = String(new Types.ObjectId());

			const task1 = {
				userId: userId,
				task: "Tarefa 1",
			};
			const task2 = {
				userId: userId,
				task: "Tarefa 2",
			};
			const task3 = {
				userId: userId,
				task: "Tarefa 3",
			};

			await taskService.create(task1);
			await taskService.create(task2);
			await taskService.create(task3);

			const tasks = await taskService.findAll(userId);

			expect(tasks).toHaveLength(3);
			expect(tasks).toEqual(taskRepository.tasks);
			expect(tasks[0]).toMatchObject(taskRepository.tasks[0]);
			expect(tasks[1]).toMatchObject(taskRepository.tasks[1]);
			expect(tasks[2]).toMatchObject(taskRepository.tasks[2]);
			expect(tasks[3]).toBeUndefined();
		});
	});

	describe("update", () => {
		it("Deve atualizar uma task", async () => {
			const userId = String(new Types.ObjectId());

			const data = {
				userId: userId,
				task: "Tarefa 1",
			};

			const newTask = await taskService.create(data);

			const updateTask = {
				task: "Tarefa 1 - Atualizada",
				completed: true,
			};

			await taskService.update(newTask._id.toString(), userId, updateTask);

			const tasks = await taskService.findAll(userId);

			expect(tasks[0].task).toEqual(updateTask.task);
			expect(tasks[0].completed).toEqual(updateTask.completed);
		});

		it("Deve ocorrer um erro se a task não for encontrada", async () => {
			const data = {
				task: "Tarefa 1 - Atualizada",
			};

			await expect(taskService.update("1", "1", data)).rejects.toThrow();
			await expect(taskService.update("2", "2", data)).rejects.toThrow(
				"Tarefa não encontrada.",
			);
		});
	});

	describe("remove", () => {
		it("Deve remover uma task", async () => {
			const userId = String(new Types.ObjectId());

			const data = {
				userId: userId,
				task: "Tarefa 1",
			};

			const newTask = await taskService.create(data);

			expect(taskRepository.tasks).toHaveLength(1);

			await taskService.remove(String(newTask._id), String(newTask.userId));

			expect(taskRepository.tasks).toHaveLength(0);
		});

		it("Deve ocorrer um erro se a task não for encontrada", async () => {
			await expect(taskService.remove("1", "1")).rejects.toThrow();
			await expect(taskService.remove("2", "2")).rejects.toThrow(
				"Tarefa não encontrada.",
			);
		});
	});
});
