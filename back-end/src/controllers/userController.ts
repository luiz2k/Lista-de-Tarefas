import { BadRequestError } from "../helpers/errorHandler";
import {
	createUserSchema,
	updateUserSchema,
} from "../validations/userValidation";

import type { Request, Response } from "express";
import type { IUserService } from "../services/interfaces/IUserService";

export class UserController {
	constructor(private readonly userService: IUserService) {}

	async create(req: Request, res: Response): Promise<Response> {
		const isValidData = createUserSchema.safeParse(req.body);

		if (!isValidData.success) {
			const errors = isValidData.error.issues;

			throw new BadRequestError("Erro na validação dos dados.", errors);
		}

		const user = await this.userService.create(isValidData.data);

		return res.status(201).json({
			message: "Usuário criado com sucesso.",
			data: user,
		});
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.id as string;

		const user = await this.userService.findOne(userId);

		return res.status(200).json({
			message: "Usuário encontrado.",
			data: user,
		});
	}

	async update(req: Request, res: Response): Promise<Response> {
		const userId = req.user?.id as string;
		const isValidData = updateUserSchema.safeParse(req.body);

		if (!isValidData.success) {
			throw new BadRequestError("Erro na validação dos dados.");
		}

		await this.userService.update(userId, isValidData.data);

		return res.status(200).json({
			message: "Usuário atualizado com sucesso.",
			data: isValidData.data,
		});
	}
}
