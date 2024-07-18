import { ConflictError, NotFoundError } from "../../helpers/errorHandler";
import type {
	IUserService,
	UserOutput,
} from "../../services/interfaces/IUserService";
import type { UserInput } from "../../types/user";
import type { UserRepository } from "./userRepository";

export class UserService implements IUserService {
	constructor(private readonly userRepository: UserRepository) {}

	async create(data: UserInput): Promise<UserOutput> {
		const userExists = await this.userRepository.findByEmail(data.email);

		if (userExists) {
			throw new ConflictError("E-mail já cadastrado.");
		}

		const user = await this.userRepository.create(data);

		return {
			username: user.username,
			email: user.email,
		};
	}

	async findOne(id: string): Promise<UserOutput> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new NotFoundError("Usuário não encontrado.");
		}

		// const { username, email, password } = user;

		return {
			username: user.username,
			email: user.email,
		};
	}

	async update(_id: string, _user: Partial<UserInput>): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
