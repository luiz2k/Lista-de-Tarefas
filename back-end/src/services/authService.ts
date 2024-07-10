import bcrypt from "bcrypt";
import { BadRequestError, UnauthorizedError } from "../helpers/errorHandler";

import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { GenerateTokenOutput } from "../types/jwt";
import type { IAuthService, LoginInput } from "./interfaces/IAuthService";
import type { IJwtService } from "./interfaces/IJwtService";

export class AuthService implements IAuthService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly jwtService: IJwtService,
	) {}

	public async login(data: LoginInput): Promise<GenerateTokenOutput> {
		const user = await this.userRepository.findByEmail(data.email);

		if (!user) {
			throw new BadRequestError("E-mail ou senha inválidos");
		}

		const isValidPassword = bcrypt.compareSync(data.password, user.password);

		if (!isValidPassword) {
			throw new BadRequestError("E-mail ou senha inválidos");
		}

		const userId = String(user._id);

		const token = await this.jwtService.generateTokens(userId);

		return token;
	}

	public async refreshToken(token: string): Promise<GenerateTokenOutput> {
		const payload = await this.jwtService.verifyToken(token);

		if (!payload) {
			throw new UnauthorizedError("Token inválido.");
		}

		const newToken = await this.jwtService.refreshToken(payload.id, token);

		return newToken;
	}
}
