import type { GenerateTokenOutput, Payload } from "../../types/jwt";

export interface IJwtService {
	verifyToken(token: string): Promise<Payload | false>;

	generateTokens(userId: string): Promise<GenerateTokenOutput>;

	refreshToken(userId: string, token: string): Promise<GenerateTokenOutput>;
}
