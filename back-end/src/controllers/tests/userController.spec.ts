import { vi } from "vitest";
import { UserRepository } from "../../tests/__mocks__/userRepository";
import { UserService } from "../../tests/__mocks__/userService";
import { UserController } from "../userController";

import type { Request, Response } from "express";
import type { IUserService } from "../../services/interfaces/IUserService";

const res: Partial<Response> = {
	status: vi.fn().mockReturnThis(),
	json: vi.fn(),
};

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
					username: "Example",
					email: "example2@ex.com",
					password: "123456",
					confirmPassword: "123456",
				},
			};

			await userController.create(req as Request, res as Response);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				message: "Usuário criado com sucesso.",
				data: {
					username: req.body.username,
					email: req.body.email,
				},
			});
		});

		it("Deve ocorrer um erro de validação", async () => {
			const req: Partial<Request> = {
				body: {
					username: "Example",
					email: "example2@ex.com",
					password: "123456",
					confirmPassword: "12345678",
				},
			};

			await expect(
				userController.create(req as Request, res as Response),
			).rejects.toThrow("Erro na validação dos dados");
		});
	});
});
