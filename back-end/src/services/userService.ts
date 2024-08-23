import { ConflictError } from "../helpers/errorHandler.js";

import type { IUserRepository } from "../repositories/interfaces/IUserRepository.js";
import type { UserInput } from "../types/user.js";
import type { IUserService, UserOutput } from "./interfaces/IUserService.js";

export class UserService implements IUserService {
	constructor(private readonly UserRepository: IUserRepository) {}

	async create(data: UserInput): Promise<UserOutput> {
		const userExists = await this.UserRepository.findByEmail(data.email);

		if (userExists) {
			throw new ConflictError("E-mail já cadastrado.");
		}

		const user = await this.UserRepository.create(data);

		return {
			username: user.username,
			email: user.email,
		};
	}
}
