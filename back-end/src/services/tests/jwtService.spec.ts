import { Types } from "mongoose";
import { JwtService } from "../jwtService";

import type {
	CreateRefreshTokenInput,
	CreateRefreshTokenOutput,
	CreateRevokedTokenInput,
	IJwtRepository,
	RefreshTokenInput,
} from "../../repositories/interfaces/IJwtRepository";
import type { IJwtService } from "../interfaces/IJwtService";

class JwtRepository implements IJwtRepository {
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

describe("JwtService", () => {
	let jwtRepository: IJwtRepository;
	let jwtService: IJwtService;

	beforeEach(() => {
		jwtRepository = new JwtRepository();
		jwtService = new JwtService(jwtRepository);
	});

	describe("verifyToken", () => {
		it("Deve retornar o payload se o token for valido", async () => {
			const userId = new Types.ObjectId().toString();

			const tokens = await jwtService.generateTokens(userId);

			const isValidAcessToken = await jwtService.verifyToken(
				tokens.access.token,
			);

			if (!isValidAcessToken) {
				return;
			}

			expect(isValidAcessToken).toHaveProperty("id");
			expect(isValidAcessToken).toHaveProperty("iat");
			expect(isValidAcessToken).toHaveProperty("exp");
			expect(isValidAcessToken.id).toBeDefined();
			expect(isValidAcessToken.iat).toBeDefined();
			expect(isValidAcessToken.exp).toBeDefined();

			const isValidRefreshToken = await jwtService.verifyToken(
				tokens.refresh.token,
			);

			if (!isValidRefreshToken) {
				return;
			}

			expect(isValidRefreshToken).toHaveProperty("id");
			expect(isValidRefreshToken).toHaveProperty("iat");
			expect(isValidRefreshToken).toHaveProperty("exp");
			expect(isValidRefreshToken.id).toBeDefined();
			expect(isValidRefreshToken.iat).toBeDefined();
			expect(isValidRefreshToken.exp).toBeDefined();
		});

		it("Deve retornar false se o token for inválido", async () => {
			const token = "token inválido";

			const result = await jwtService.verifyToken(token);

			expect(result).toEqual(false);
		});
	});

	describe("generateTokens", () => {
		it("Deve gerar um token de acesso e refresh", async () => {
			const userId = new Types.ObjectId().toString();

			const token = await jwtService.generateTokens(userId);

			expect(token).toHaveProperty("access");
			expect(token).toHaveProperty("refresh");
			expect(token.access.token).toBeDefined();
			expect(token.access.expiresIn).toBeDefined();
			expect(token.refresh.token).toBeDefined();
		});
	});

	describe("refreshToken", () => {
		it("Deve retornar um novo token", async () => {
			const userId = new Types.ObjectId().toString();

			const token = await jwtService.generateTokens(userId);

			const newTokens = await jwtService.refreshToken(
				userId,
				token.refresh.token,
			);

			expect(newTokens).toHaveProperty("access");
			expect(newTokens).toHaveProperty("refresh");
			expect(newTokens.access.token).toBeDefined();
			expect(newTokens.access.expiresIn).toBeDefined();
			expect(newTokens.refresh.token).toBeDefined();
		});

		it("Deve retornar um erro se o refresh token for desconhecido", async () => {
			const userId = new Types.ObjectId().toString();

			const token = "token inválido";

			await expect(jwtService.refreshToken(userId, token)).rejects.toThrow(
				"Token inválido",
			);
		});
	});
});
