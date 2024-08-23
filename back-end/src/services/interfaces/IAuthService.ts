import type { GenerateTokenOutput } from "../../types/jwt.js";

export type LoginInput = {
	email: string;
	password: string;
};

export interface IAuthService {
	login(data: LoginInput): Promise<GenerateTokenOutput>;

	refreshToken(token: string): Promise<GenerateTokenOutput>;
}
