import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/errorHandler";
import { env } from "../validations/envValidation";

import type { IJwtRepository } from "../repositories/interfaces/IJwtRepository";
import type { GenerateTokenOutput, Payload } from "../types/jwt";
import type { IJwtService } from "./interfaces/IJwtService";

// Serviço de JSON Web Token
export class JwtService implements IJwtService {
	constructor(private readonly jwtRepository: IJwtRepository) {}

	// Verifica se um token é válido
	public async verifyToken(token: string): Promise<Payload | false> {
		try {
			const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as Payload;

			return decoded;
		} catch {
			return false;
		}
	}

	// Gera novos tokens
	public async generateTokens(userId: string): Promise<GenerateTokenOutput> {
		const TIMESTAMP_IN_MILLISECONDS = Date.now();
		const TIMESTAMP_IN_SECONDS = Math.floor(TIMESTAMP_IN_MILLISECONDS / 1000);

		const EXPIRES_IN_ONE_HOUR = TIMESTAMP_IN_SECONDS + 60 * 60;
		const EXPIRES_IN_ONE_HOUR_IN_MILLISECONDS = EXPIRES_IN_ONE_HOUR * 1000;
		const EXPIRES_IN_SEVEN_DAYS = TIMESTAMP_IN_SECONDS + 60 * 60 * 24 * 7;

		// Conteúdo do token de acesso
		const accessTokenPayload: Payload = {
			sub: userId,
			iat: TIMESTAMP_IN_SECONDS,
			exp: EXPIRES_IN_ONE_HOUR,
		};

		// Conteúdo do token de refresh
		const refreshTokenPayload: Payload = {
			sub: userId,
			iat: TIMESTAMP_IN_SECONDS,
			exp: EXPIRES_IN_SEVEN_DAYS,
		};

		// Gera os tokens de acesso e refresh a partir do conteúdo
		const accessToken = jwt.sign(accessTokenPayload, env.ACCESS_TOKEN_SECRET);
		const refreshToken = jwt.sign(
			refreshTokenPayload,
			env.REFRESH_TOKEN_SECRET,
		);

		// Salva o refresh token no banco de dados
		await this.jwtRepository.createRefreshToken({
			userId: userId,
			token: refreshToken,
			createdAt: new Date(TIMESTAMP_IN_MILLISECONDS),
			expiresAt: new Date(EXPIRES_IN_SEVEN_DAYS * 1000),
		});

		return {
			access: {
				token: accessToken,
				expiresIn: EXPIRES_IN_ONE_HOUR_IN_MILLISECONDS,
			},
			refresh: {
				token: refreshToken,
			},
		};
	}

	// Gera novos tokens através de um token de refresh
	public async refreshToken(
		userId: string,
		token: string,
	): Promise<GenerateTokenOutput> {
		const refreshToken = await this.jwtRepository.findRefreshToken({
			userId: userId,
			token: token,
		});

		// Verifica se o token de refresh existe no banco de dados
		if (!refreshToken) {
			throw new UnauthorizedError("Token inválido.");
		}

		// Remove o token da tabela de refresh
		await this.jwtRepository.removeRefreshToken({
			userId: userId,
			token: token,
		});

		// Adiciona o token a tabela de revoked
		await this.jwtRepository.createRevokedToken({
			userId: String(refreshToken.user.id),
			token: refreshToken.token,
			revokedAt: new Date(),
		});

		// Gera os novos tokens
		const newTokens = await this.generateTokens(userId);

		return newTokens;
	}
}
