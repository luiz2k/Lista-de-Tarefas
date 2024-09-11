import { Types } from "mongoose";
import { JwtRepository } from "../../tests/__mocks__/jwtRepository";
import { JwtService } from "../jwtService";

import type { IJwtRepository } from "../../repositories/interfaces/IJwtRepository";
import type { IJwtService } from "../interfaces/IJwtService";

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

			expect(isValidAcessToken).toHaveProperty("sub");
			expect(isValidAcessToken).toHaveProperty("iat");
			expect(isValidAcessToken).toHaveProperty("exp");
			expect(isValidAcessToken.sub).toBeDefined();
			expect(isValidAcessToken.iat).toBeDefined();
			expect(isValidAcessToken.exp).toBeDefined();

			const isValidRefreshToken = await jwtService.verifyToken(
				tokens.refresh.token,
			);

			if (!isValidRefreshToken) {
				return;
			}

			expect(isValidRefreshToken).toHaveProperty("sub");
			expect(isValidRefreshToken).toHaveProperty("iat");
			expect(isValidRefreshToken).toHaveProperty("exp");
			expect(isValidRefreshToken.sub).toBeDefined();
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
