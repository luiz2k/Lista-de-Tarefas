import { JwtRepository } from "../../tests/__mocks__/jwtRepository";
import { JwtService } from "../../tests/__mocks__/jwtService";
import { UserRepository } from "../../tests/__mocks__/userRepository";
import { AuthService } from "../authService";

import type { IJwtRepository } from "../../repositories/interfaces/IJwtRepository";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import type { IAuthService } from "../interfaces/IAuthService";
import type { IJwtService } from "../interfaces/IJwtService";

describe("authService", () => {
	let userRepository: IUserRepository;
	let jwtRepository: IJwtRepository;
	let jwtService: IJwtService;
	let authService: IAuthService;

	beforeEach(() => {
		userRepository = new UserRepository();
		jwtRepository = new JwtRepository();
		jwtService = new JwtService(jwtRepository);
		authService = new AuthService(userRepository, jwtService);
	});

	describe("login", () => {
		it("Deve fazer o login e retornar os tokens", async () => {
			const data = {
				email: "example@ex.com",
				password: "123456",
			};

			const token = await authService.login(data);

			expect(token).toHaveProperty("access");
			expect(token).toHaveProperty("refresh");
			expect(token.access.token).toBeDefined();
			expect(token.access.expiresIn).toBeDefined();
			expect(token.refresh.token).toBeDefined();
		});

		it("Deve retornar um erro se o email for inválido", async () => {
			const data = {
				email: "example@error.com",
				password: "123456",
			};

			await expect(authService.login(data)).rejects.toThrow(
				"E-mail ou senha inválidos",
			);
		});

		it("Deve retornar um erro se o password for inválido", async () => {
			const data = {
				email: "example@ex.com",
				password: "error",
			};

			await expect(authService.login(data)).rejects.toThrow(
				"E-mail ou senha inválidos",
			);
		});
	});

	describe("refreshToken", () => {
		it("Deve retornar um novo token ao refazer o refresh", async () => {
			const data = {
				email: "example@ex.com",
				password: "123456",
			};

			const tokens = await authService.login(data);

			const newToken = await authService.refreshToken(tokens.refresh.token);

			expect(newToken).toHaveProperty("access");
			expect(newToken).toHaveProperty("refresh");
			expect(newToken.access.token).toBeDefined();
			expect(newToken.access.expiresIn).toBeDefined();
			expect(newToken.refresh.token).toBeDefined();
		});

		it("Deve retornar um erro se o token for inválido", async () => {
			const token = "token inválido";

			await expect(authService.refreshToken(token)).rejects.toThrow(
				"Token inválido.",
			);
		});
	});
});
