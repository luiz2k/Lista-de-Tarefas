import type { Types } from "mongoose";

export type CreateRefreshTokenInput = {
	userId: string;
	token: string;
	createdAt: Date;
	expiresAt: Date;
};

export type CreateRefreshTokenOutput = {
	userId: Types.ObjectId;
	token: string;
	createdAt: Date;
	expiresAt: Date;
};

export type CreateRevokedTokenInput = {
	userId: string;
	token: string;
	revokedAt: Date;
};

export type RefreshTokenInput = {
	userId: string;
	token: string;
};

export interface IJwtRepository {
	createRefreshToken(data: CreateRefreshTokenInput): Promise<void>;

	findRefreshToken(
		data: RefreshTokenInput,
	): Promise<CreateRefreshTokenOutput | null>;

	removeRefreshToken(data: RefreshTokenInput): Promise<void>;

	createRevokedToken(data: CreateRevokedTokenInput): Promise<void>;
}
