import { vi } from "vitest";
import { AuthService } from "../../tests/__mocks__/authService";
import { JwtRepository } from "../../tests/__mocks__/jwtRepository";
import { JwtService } from "../../tests/__mocks__/jwtService";
import { UserRepository } from "../../tests/__mocks__/userRepository";
import { AuthController } from "../authController";

import type { Request, Response } from "express";
import type { IJwtRepository } from "../../repositories/interfaces/IJwtRepository";
import type { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import type { IAuthService } from "../../services/interfaces/IAuthService";
import type { IJwtService } from "../../services/interfaces/IJwtService";

describe("userController", () => {
	let userRepository: IUserRepository;
	let jwtRepository: IJwtRepository;
	let jwtService: IJwtService;
	let authService: IAuthService;
	let authController: AuthController;

	beforeEach(() => {
		userRepository = new UserRepository();
		jwtRepository = new JwtRepository();
		jwtService = new JwtService(jwtRepository);
		authService = new AuthService(userRepository, jwtService);
		authController = new AuthController(authService);
	});

	describe("login", () => {
		it("Deve fazer o login e retornar os tokens", async () => {
			const req: Partial<Request> = {
				body: {
					email: "example@ex.com",
					password: "123456",
				},
			};

      const res: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

			await authController.login(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				message: "Login realizado com sucesso.",
				data: {
					access: {
						token: expect.any(String),
						expiresIn: expect.any(Number),
					},
					refresh: {
						token: expect.any(String),
					},
				},
			});
		});

		it("Deve ocorrer um erro de validação", async () => {
			const req: Partial<Request> = {
				body: {
					email: "",
					password: "123456",
				},
			};

      const res: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

			await expect(
				authController.login(req as Request, res as Response),
			).rejects.toThrow("E-mail ou senha inválidos");
		});
	});

	describe("refreshToken", () => {
		it("Deve retornar um novo token ao refazer o refresh", async () => {
			const user = {
				email: "example@ex.com",
				password: "123456",
			};

			const tokens = await authService.login(user);

			const req: Partial<Request> = {
				body: {
					refreshToken: tokens.refresh.token,
				},
			};

			const res: Partial<Response> = {
				status: vi.fn().mockReturnThis(),
				json: vi.fn(),
			};

			await authController.refreshToken(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				message: "Token atualizado com sucesso.",
				data: {
					access: {
						token: expect.any(String),
						expiresIn: expect.any(Number),
					},
					refresh: {
						token: expect.any(String),
					},
				},
			});
		});

		it("Deve ocorrer um erro validação dos dados do body", async () => {
			const req: Partial<Request> = {
				body: {
					refreshToken: "",
				},
			};

      const res: Partial<Response> = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

			await expect(
				authController.refreshToken(req as Request, res as Response),
			).rejects.toThrow("Token inválido.");
		});
	});
});
