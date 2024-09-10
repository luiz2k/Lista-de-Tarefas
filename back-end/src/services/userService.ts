import { ConflictError } from "../helpers/errorHandler";

import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { UserInput } from "../types/user";
import type { IUserService, UserOutput } from "./interfaces/IUserService";

// Serviço de usuários
export class UserService implements IUserService {
	constructor(private readonly UserRepository: IUserRepository) {}

	// Cria um novo usuário
	async create(data: UserInput): Promise<UserOutput> {
		const userExists = await this.UserRepository.findByEmail(data.email);

		// Se o usuário existir, lança um erro
		if (userExists) {
			throw new ConflictError("E-mail já cadastrado.");
		}

		const user = await this.UserRepository.create(data);

		return {
			email: user.email,
		};
	}
}
