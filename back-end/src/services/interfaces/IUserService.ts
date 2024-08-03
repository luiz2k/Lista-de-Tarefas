import type { UserInput } from "../../types/user";

export type UserOutput = {
	username: string;
	email: string;
};

export interface IUserService {
	create(data: UserInput): Promise<UserOutput>;
}
