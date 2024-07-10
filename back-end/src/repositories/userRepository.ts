import { User } from "../models/userModel";

import type { UserInput } from "../types/user";
import type { IUserRepository, UserOutput } from "./interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
	public async create(data: UserInput): Promise<UserOutput> {
		const user = await User.create(data);

		return user;
	}

	public async findByEmail(email: string): Promise<UserOutput | null> {
		const user = await User.findOne({ email: email });

		return user;
	}

	public async findById(id: string): Promise<UserOutput | null> {
		const user = await User.findById(id);

		return user;
	}

	public async update(id: string, data: Partial<UserInput>): Promise<void> {
		await User.findByIdAndUpdate({ _id: id }, data);
	}

	public async remove(id: string): Promise<void> {
		await User.findByIdAndDelete({ userId: id });
	}
}
