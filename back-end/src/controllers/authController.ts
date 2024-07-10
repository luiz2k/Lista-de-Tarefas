import { BadRequestError } from "../helpers/errorHandler";
import { loginSchema, refreshTokenSchema } from "../validations/authValidation";

import type { Request, Response } from "express";
import type { IAuthService } from "../services/interfaces/IAuthService";

export class AuthController {
	constructor(private readonly authService: IAuthService) {}

	public async login(req: Request, res: Response): Promise<Response> {
		const isValidData = loginSchema.safeParse(req.body);

		if (!isValidData.success) {
			throw new BadRequestError("E-mail ou senha inválidos");
		}

		const token = await this.authService.login(isValidData.data);

		return res.status(200).json({
			message: "Login realizado com sucesso.",
			data: token,
		});
	}

	public async refreshToken(req: Request, res: Response): Promise<Response> {
		const isValidData = refreshTokenSchema.safeParse(req.body);

		if (!isValidData.success) {
			throw new BadRequestError("Token inválido.");
		}

		const refreshToken: string = isValidData.data.refreshToken;

		const newTokens = await this.authService.refreshToken(refreshToken);

		return res.status(200).json({
			message: "Token atualizado com sucesso.",
			data: newTokens,
		});
	}
}
