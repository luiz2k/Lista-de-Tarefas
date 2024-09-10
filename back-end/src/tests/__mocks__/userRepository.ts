import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";

import type {
	IUserRepository,
	UserOutput,
} from "../../repositories/interfaces/IUserRepository";
import type { UserInput } from "../../types/user";

export class UserRepository implements IUserRepository {
	users: UserOutput[] = [
		{
			id: randomUUID(),
			email: "example@ex.com",
			password: bcrypt.hashSync("123456", 10),
		},
	];

	async create(data: UserInput): Promise<UserOutput> {
		const newUser = {
			id: randomUUID(),
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
