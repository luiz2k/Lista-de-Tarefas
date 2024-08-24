import type { GenerateTokenOutput } from "../../types/jwt";

export type LoginInput = {
	email: string;
	password: string;
};

export interface IAuthService {
	login(data: LoginInput): Promise<GenerateTokenOutput>;

	refreshToken(token: string): Promise<GenerateTokenOutput>;
}
