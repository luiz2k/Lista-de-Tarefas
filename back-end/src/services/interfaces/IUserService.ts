import type { UserInput } from "../../types/user";

export type UserOutput = {
	email: string;
};

export interface IUserService {
	create(data: UserInput): Promise<UserOutput>;
}
