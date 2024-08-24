import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/userEntity";

import type { UserInput } from "../types/user";
import type { IUserRepository, UserOutput } from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
	userRepository = AppDataSource.getRepository(User);

	public async create(data: UserInput): Promise<UserOutput> {
		const user = this.userRepository.create(data);

		await this.userRepository.save(user);

		return user;
	}

	public async findByEmail(email: string): Promise<UserOutput | null> {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
		});

		return user;
	}

	public async findById(id: string): Promise<UserOutput | null> {
		const user = await this.userRepository.findOneBy({
			id,
		});

		return user;
	}

	public async update(id: string, data: Partial<UserInput>): Promise<void> {
		await this.userRepository.update(id, data);
	}

	public async remove(id: string): Promise<void> {
		await this.userRepository.delete(id);
	}
}
