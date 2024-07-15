import bcrypt from "bcrypt";
import { Types } from "mongoose";

import type {
	IUserRepository,
	UserOutput,
} from "../../repositories/interfaces/IUserRepository";
import type { UserInput } from "../../types/user";
import { UserService } from "../userService";

class UserRepository implements IUserRepository {
	users = [
		{
			_id: new Types.ObjectId(),
			username: "Example",
			email: "example@ex.com",
			password: bcrypt.hashSync("123456", 10),
		},
	];

	async create(data: UserInput): Promise<UserOutput> {
		const newUser = {
			_id: new Types.ObjectId(),
			username: "Example",
			email: data.email,
			password: bcrypt.hashSync(data.password, 10),
		};

		this.users.push(newUser);

		return newUser;
	}

	async findByEmail(email: string): Promise<UserOutput | null> {
		const user = this.users.find((user) => user.email === email);

		return user || null;
	}

	findById(_id: string): Promise<UserOutput | null> {
		throw new Error("Method not implemented.");
	}

	update(_id: string, _user: Partial<UserInput>): Promise<void> {
		throw new Error("Method not implemented.");
	}

	remove(_id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

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
				username: "Example",
				email: "example2@ex.com",
				password: "123456",
			};

			const user = await userService.create(data);

			expect(user).toEqual({
				username: "Example",
				email: "example2@ex.com",
			});

			expect(user).toHaveProperty("username");
			expect(user).toHaveProperty("email");
			expect(user.username).toBeDefined();
			expect(user.email).toBeDefined();
		});

		it("Deve retornar um erro se o email ja existir", async () => {
			const data = {
				username: "Example",
				email: "example@ex.com",
				password: "123456",
			};

			expect(userService.create(data)).rejects.toThrow("E-mail já cadastrado.");
		});
	});
});
