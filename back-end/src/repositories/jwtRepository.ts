import { RefreshToken, RevokedToken } from "../models/jwtModel";

import type {
	CreateRefreshTokenInput,
	CreateRefreshTokenOutput,
	IJwtRepository,
	RefreshTokenInput,
} from "./interfaces/IJwtRepository";

export class JwtRepository implements IJwtRepository {
	public async createRefreshToken(
		data: CreateRefreshTokenInput,
	): Promise<void> {
		await RefreshToken.create(data);
	}

	public async findRefreshToken(
		data: RefreshTokenInput,
	): Promise<CreateRefreshTokenOutput | null> {
		const refreshToken = await RefreshToken.findOne(data);

		return refreshToken;
	}

	public async removeRefreshToken(data: RefreshTokenInput): Promise<void> {
		await RefreshToken.findOneAndDelete(data);
	}

	public async createRevokedToken(data: RefreshTokenInput): Promise<void> {
		await RevokedToken.create(data);
	}
}
