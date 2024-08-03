import { BadRequestError } from "../helpers/errorHandler";
import { objectIdSchema } from "../validations/mongodbValidation";
import {
	createTaskSchema,
	updateTaskSchema,
} from "../validations/taskValidation";

import type { Request, Response } from "express";
import type { ITaskService } from "../services/interfaces/ITaskService";

export class TaskController {
	constructor(private readonly taskService: ITaskService) {}

	async create(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.id as string;

		const isValidData = createTaskSchema.safeParse(req.body);

		if (!isValidData.success) {
			const errors = isValidData.error.issues;

			throw new BadRequestError("Erro na validação dos dados.", errors);
		}

		const task = await this.taskService.create({ ...isValidData.data, userId });

		return res.status(201).json({
			message: "Tarefa criada com sucesso.",
			data: task,
		});
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.id as string;

		const isValidId = objectIdSchema.safeParse(req.params.id);

		if (!isValidId.success) {
			const errors = isValidId.error.issues;

			throw new BadRequestError("Erro na validação dos dados.", errors);
		}

		const task = await this.taskService.findOne(isValidId.data, userId);

		return res.status(200).json({
			message: "Tarefa encontrada.",
			data: task,
		});
	}

	async findAll(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.id as string;

		const tasks = await this.taskService.findAll(userId);

		return res.status(200).json({
			message: "Tarefas encontradas.",
			data: tasks,
		});
	}

	async update(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.id as string;

		const isValidId = objectIdSchema.safeParse(req.params.id);

		if (!isValidId.success) {
			throw new BadRequestError("Erro na validação dos dados.");
		}

		const isValidData = updateTaskSchema.safeParse(req.body);

		if (!isValidData.success) {
			throw new BadRequestError("Erro na validação dos dados.");
		}

		await this.taskService.update(isValidId.data, userId, isValidData.data);

		return res.status(200).json({
			message: "Tarefa atualizada.",
			data: isValidData.data,
		});
	}

	async remove(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.id as string;

		const isValidId = objectIdSchema.safeParse(req.params.id);

		if (!isValidId.success) {
			throw new BadRequestError("Erro na validação dos dados.");
		}

		await this.taskService.remove(isValidId.data, userId);

		return res.status(200).json({
			message: "Tarefa removida.",
		});
	}
}
