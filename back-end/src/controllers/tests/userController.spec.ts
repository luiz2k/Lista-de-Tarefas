import { vi } from "vitest";
import { UserRepository } from "../../tests/__mocks__/userRepository";
import { UserService } from "../../tests/__mocks__/userService";
import { UserController } from "../userController";

import type { Request, Response } from "express";
import type { IUserService } from "../../services/interfaces/IUserService";

describe("userController", () => {
	let userRepository: UserRepository;
	let userService: IUserService;
	let userController: UserController;

	beforeEach(() => {
		userRepository = new UserRepository();
		userService = new UserService(userRepository);
		userController = new UserController(userService);
	});

	describe("create", () => {
		it("Deve criar um usuário", async () => {
			const req: Partial<Request> = {
				body: {
					email: "example2@ex.com",
					password: "123456",
					confirmPassword: "123456",
				},
			};

			const res: Partial<Response> = {
				status: vi.fn().mockReturnThis(),
				json: vi.fn(),
			};

			await userController.create(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				message: "Usuário criado com sucesso.",
				data: {
					email: req.body.email,
				},
			});
		});

		it("Deve ocorrer um erro validação dos dados do body", async () => {
			const req: Partial<Request> = {
				body: {
					email: "example2@ex.com",
					password: "123456",
					confirmPassword: "12345678",
				},
			};

			const res: Partial<Response> = {
				status: vi.fn().mockReturnThis(),
				json: vi.fn(),
			};

			await expect(
				userController.create(req as Request, res as Response),
			).rejects.toThrow("Erro na validação dos dados");
		});
	});
});
