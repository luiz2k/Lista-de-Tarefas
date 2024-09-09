import bcrypt from "bcrypt";
import { BadRequestError, UnauthorizedError } from "../helpers/errorHandler";

import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { GenerateTokenOutput } from "../types/jwt";
import type { IAuthService, LoginInput } from "./interfaces/IAuthService";
import type { IJwtService } from "./interfaces/IJwtService";

// Serviço de autenticação
export class AuthService implements IAuthService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly jwtService: IJwtService,
	) {}

	// Implementação do método de autenticação
	public async login(data: LoginInput): Promise<GenerateTokenOutput> {
		const user = await this.userRepository.findByEmail(data.email);

		// Se o usuário existir, lança um erro
		if (!user) {
			throw new UnauthorizedError("E-mail ou senha inválidos");
		}

		const isValidPassword = bcrypt.compareSync(data.password, user.password);

		// Se a senha for inválida, lança um erro
		if (!isValidPassword) {
			throw new UnauthorizedError("E-mail ou senha inválidos");
		}

		const userId = String(user.id);

		// Gera os tokens
		const token = await this.jwtService.generateTokens(userId);

		return token;
	}

	// Implementação do método de refresh token
	public async refreshToken(token: string): Promise<GenerateTokenOutput> {
		const payload = await this.jwtService.verifyToken(token);

		if (!payload) {
			throw new BadRequestError("Token inválido.");
		}

		const newToken = await this.jwtService.refreshToken(payload.id, token);

		return newToken;
	}
}
