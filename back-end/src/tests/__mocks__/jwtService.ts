import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../helpers/errorHandler";
import { env } from "../../validations/envValidation";

import type { IJwtRepository } from "../../repositories/interfaces/IJwtRepository";
import type { IJwtService } from "../../services/interfaces/IJwtService";
import type { GenerateTokenOutput, Payload } from "../../types/jwt";

export class JwtService implements IJwtService {
	constructor(private readonly jwtRepository: IJwtRepository) {}

	async verifyToken(token: string): Promise<Payload | false> {
		try {
			const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as Payload;

			return decoded;
		} catch {
			return false;
		}
	}

	public async generateTokens(userId: string): Promise<GenerateTokenOutput> {
		const TIMESTAMP_IN_MILLISECONDS = Date.now();
		const TIMESTAMP_IN_SECONDS = Math.floor(TIMESTAMP_IN_MILLISECONDS / 1000);

		const EXPIRES_IN_ONE_HOUR = TIMESTAMP_IN_SECONDS + 60 * 60;
		const EXPIRES_IN_SEVEN_DAYS = TIMESTAMP_IN_SECONDS + 60 * 60 * 24 * 7;

		const accessTokenPayload: Payload = {
			sub: userId,
			iat: TIMESTAMP_IN_SECONDS,
			exp: EXPIRES_IN_ONE_HOUR,
		};

		const refreshTokenPayload: Payload = {
			sub: userId,
			iat: TIMESTAMP_IN_SECONDS,
			exp: EXPIRES_IN_SEVEN_DAYS,
		};

		const accessToken = jwt.sign(accessTokenPayload, env.ACCESS_TOKEN_SECRET);
		const refreshToken = jwt.sign(
			refreshTokenPayload,
			env.REFRESH_TOKEN_SECRET,
		);

		await this.jwtRepository.createRefreshToken({
			userId: userId,
			token: refreshToken,
			createdAt: new Date(TIMESTAMP_IN_MILLISECONDS),
			expiresAt: new Date(EXPIRES_IN_SEVEN_DAYS * 1000),
		});

		return {
			access: {
				token: accessToken,
				expiresIn: TIMESTAMP_IN_MILLISECONDS,
			},
			refresh: {
				token: refreshToken,
			},
		};
	}

	async refreshToken(
		userId: string,
		token: string,
	): Promise<GenerateTokenOutput> {
		const refreshToken = await this.jwtRepository.findRefreshToken({
			userId: userId,
			token: token,
		});

		if (!refreshToken) {
			throw new UnauthorizedError("Token inválido.");
		}

		await this.jwtRepository.removeRefreshToken({
			userId: userId,
			token: token,
		});

		await this.jwtRepository.createRevokedToken({
			userId: refreshToken.user.id,
			token: refreshToken.token,
			revokedAt: new Date(),
		});

		const newTokens = await this.generateTokens(userId);

		return newTokens;
	}
}
