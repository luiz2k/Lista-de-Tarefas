import { randomUUID } from "node:crypto";
import { TaskRepository } from "../../tests/__mocks__/taskRepository";
import { TaskService } from "../taskService";

import type { ITaskService } from "../interfaces/ITaskService";

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
				userId: randomUUID(),
				task: "Tarefa 1",
			};

			const task = await taskService.create(data);

			expect(task).toMatchObject(taskRepository.tasks[0]);
		});
	});

	describe("findOne", () => {
		it("Deve encontrar uma task", async () => {
			const data = {
				userId: randomUUID(),
				task: "Tarefa 1",
			};

			const newTask = await taskService.create(data);

			const task = await taskService.findOne(newTask.id, data.userId);

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
			const userId = randomUUID();

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
			const userId = randomUUID();

			const data = {
				userId: userId,
				task: "Tarefa 1",
			};

			const newTask = await taskService.create(data);

			const updateTask = {
				task: "Tarefa 1 - Atualizada",
				completed: true,
			};

			await taskService.update(newTask.id.toString(), userId, updateTask);

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
			const userId = randomUUID();

			const data = {
				userId: userId,
				task: "Tarefa 1",
			};

			const newTask = await taskService.create(data);

			expect(taskRepository.tasks).toHaveLength(1);

			await taskService.remove(newTask.id, newTask.user.id);

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
