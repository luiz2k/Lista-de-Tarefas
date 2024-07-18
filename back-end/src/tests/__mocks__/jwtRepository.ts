import { Types } from "mongoose";

import type {
	CreateRefreshTokenInput,
	CreateRefreshTokenOutput,
	CreateRevokedTokenInput,
	IJwtRepository,
	RefreshTokenInput,
} from "../../repositories/interfaces/IJwtRepository";

export class JwtRepository implements IJwtRepository {
	refreshTokens: CreateRefreshTokenOutput[] = [];
	revokedTokens: CreateRevokedTokenInput[] = [];

	async createRefreshToken(data: CreateRefreshTokenInput): Promise<void> {
		this.refreshTokens.push({
			...data,
			userId: new Types.ObjectId(data.userId),
		});
	}

	async findRefreshToken(
		data: RefreshTokenInput,
	): Promise<CreateRefreshTokenOutput | null> {
		const token = this.refreshTokens.find(
			(token) =>
				String(token.userId) === data.userId && token.token === data.token,
		);

		return token || null;
	}

	async removeRefreshToken(data: RefreshTokenInput): Promise<void> {
		const indiceToken = this.refreshTokens.findIndex(
			(token) =>
				String(token.userId) === data.userId && token.token === data.token,
		);

		this.refreshTokens.splice(indiceToken, 1);
	}

	async createRevokedToken(data: CreateRevokedTokenInput): Promise<void> {
		this.revokedTokens.push(data);
	}
}
