import type { UserInput } from "../../types/user.js";

export type UserOutput = {
	username: string;
	email: string;
};

export interface IUserService {
	create(data: UserInput): Promise<UserOutput>;
}
