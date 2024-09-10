import { UserRepository } from "../../tests/__mocks__/userRepository";
import { UserService } from "../userService";

describe("userService", () => {
	let userRepository: UserRepository;
	let userService: UserService;

	beforeEach(() => {
		userRepository = new UserRepository();
		userService = new UserService(userRepository);
	});

	describe("create", () => {
		it("Deve criar um usuário", async () => {
			const data = {
				email: "example2@ex.com",
				password: "123456",
			};

			const user = await userService.create(data);

			expect(user).toEqual({
				email: "example2@ex.com",
			});

			expect(user).toHaveProperty("email");
			expect(user.email).toBeDefined();
		});

		it("Deve retornar um erro se o email ja existir", async () => {
			const data = {
				email: "example@ex.com",
				password: "123456",
			};

			expect(userService.create(data)).rejects.toThrow("E-mail já cadastrado.");
		});
	});
});
