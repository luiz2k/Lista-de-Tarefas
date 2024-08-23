import { AppDataSource } from "../database/data-source.js";
import { RefreshToken, RevokedToken } from "../database/entities/jwtEntity.js";

import type {
	CreateRefreshTokenInput,
	CreateRefreshTokenOutput,
	IJwtRepository,
	RefreshTokenInput,
} from "./interfaces/IJwtRepository.js";

export class JwtRepository implements IJwtRepository {
	refreshRepository = AppDataSource.getRepository(RefreshToken);
	revokedRepository = AppDataSource.getRepository(RevokedToken);

	public async createRefreshToken(
		data: CreateRefreshTokenInput,
	): Promise<void> {
		const { userId, ...rest } = data;

		const refreshToken = this.refreshRepository.create({
			user: { id: userId },
			...rest,
		});

		await this.refreshRepository.save(refreshToken);
	}

	public async findRefreshToken(
		data: RefreshTokenInput,
	): Promise<CreateRefreshTokenOutput | null> {
		const { userId, ...rest } = data;

		const refreshToken = await this.refreshRepository.findOne({
			where: {
				user: { id: userId },
				...rest,
			},
			relations: ["user"],
			select: {
				user: {
					id: true,
				},
			},
		});

		return refreshToken;
	}

	public async removeRefreshToken(data: RefreshTokenInput): Promise<void> {
		const { userId, ...rest } = data;

		await this.refreshRepository.delete({
			user: { id: userId },
			...rest,
		});
	}

	public async createRevokedToken(data: RefreshTokenInput): Promise<void> {
		const { userId, ...rest } = data;

		const revokedToken = this.revokedRepository.create({
			user: { id: userId },
			...rest,
		});

		await this.revokedRepository.save(revokedToken);
	}
}
