import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UnauthorizedError } from "../../helpers/errorHandler";
import { env } from "../../validations/envValidation";
import { AuthService } from "../authService";

import type {
	CreateRefreshTokenInput,
	CreateRefreshTokenOutput,
	CreateRevokedTokenInput,
	IJwtRepository,
	RefreshTokenInput,
} from "../../repositories/interfaces/IJwtRepository";
import type {
	IUserRepository,
	UserOutput,
} from "../../repositories/interfaces/IUserRepository";
import type { GenerateTokenOutput, Payload } from "../../types/jwt";
import type { UserInput } from "../../types/user";
import type { IAuthService } from "../interfaces/IAuthService";
import type { IJwtService } from "../interfaces/IJwtService";

class UserRepository implements IUserRepository {
	users = [
		{
			_id: new Types.ObjectId(),
			username: "Example",
			email: "example@ex.com",
			password: bcrypt.hashSync("123456", 10),
		},
	];

	create(_data: UserInput): Promise<UserOutput> {
		throw new Error("Method not implemented.");
	}
	async findByEmail(email: string): Promise<UserOutput | null> {
		const user = this.users.find((user) => user.email === email);

		return user || null;
	}
	findById(_id: string): Promise<UserOutput | null> {
		throw new Error("Method not implemented.");
	}
	update(_id: string, _user: Partial<UserInput>): Promise<void> {
		throw new Error("Method not implemented.");
	}
	remove(_id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

class JwtRepository implements IJwtRepository {
	refreshTokens: CreateRefreshTokenOutput[] = [];
	revokedTokens: CreateRevokedTokenInput[] = [];

	async createRefreshToken(data: CreateRefreshTokenInput): Promise<void> {
		this.refreshTokens.push({
			...data,
			userId: new Types.ObjectId(data.userId),
		});
	}

	async findRefreshToken(
		data: RefreshTokenInput,
	): Promise<CreateRefreshTokenOutput | null> {
		const token = this.refreshTokens.find(
			(token) =>
				String(token.userId) === data.userId && token.token === data.token,
		);

		return token || null;
	}

	async removeRefreshToken(data: RefreshTokenInput): Promise<void> {
		const indiceToken = this.refreshTokens.findIndex(
			(token) =>
				String(token.userId) === data.userId && token.token === data.token,
		);

		this.refreshTokens.splice(indiceToken, 1);
	}

	async createRevokedToken(data: CreateRevokedTokenInput): Promise<void> {
		this.revokedTokens.push(data);
	}
}

class JwtService implements IJwtService {
	constructor(private readonly jwtRepository: IJwtRepository) {}

	async verifyToken(token: string): Promise<Payload | false> {
		try {
			const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as Payload;

			return decoded;
		} catch {
			return false;
		}
	}

	public async generateTokens(userId: string): Promise<GenerateTokenOutput> {
		const TIMESTAMP_IN_MILLISECONDS = Date.now();
		const TIMESTAMP_IN_SECONDS = Math.floor(TIMESTAMP_IN_MILLISECONDS / 1000);

		const EXPIRES_IN_ONE_HOUR = TIMESTAMP_IN_SECONDS + 60 * 60;
		const EXPIRES_IN_SEVEN_DAYS = TIMESTAMP_IN_SECONDS + 60 * 60 * 24 * 7;

		const accessTokenPayload: Payload = {
			id: userId,
			iat: TIMESTAMP_IN_SECONDS,
			exp: EXPIRES_IN_ONE_HOUR,
		};

		const refreshTokenPayload: Payload = {
			id: userId,
			iat: TIMESTAMP_IN_SECONDS,
			exp: EXPIRES_IN_SEVEN_DAYS,
		};

		const accessToken = jwt.sign(accessTokenPayload, env.ACCESS_TOKEN_SECRET);
		const refreshToken = jwt.sign(
			refreshTokenPayload,
			env.REFRESH_TOKEN_SECRET,
		);

		await this.jwtRepository.createRefreshToken({
			userId: userId,
			token: refreshToken,
			createdAt: new Date(TIMESTAMP_IN_MILLISECONDS),
			expiresAt: new Date(EXPIRES_IN_SEVEN_DAYS * 1000),
		});

		return {
			access: {
				token: accessToken,
				expiresIn: TIMESTAMP_IN_MILLISECONDS,
			},
			refresh: {
				token: refreshToken,
			},
		};
	}

	async refreshToken(
		userId: string,
		token: string,
	): Promise<GenerateTokenOutput> {
		const refreshToken = await this.jwtRepository.findRefreshToken({
			userId: userId,
			token: token,
		});

		if (!refreshToken) {
			throw new UnauthorizedError("Token inválido.");
		}

		await this.jwtRepository.removeRefreshToken({
			userId: userId,
			token: token,
		});

		await this.jwtRepository.createRevokedToken({
			userId: String(refreshToken.userId),
			token: refreshToken.token,
			revokedAt: new Date(),
		});

		const newTokens = await this.generateTokens(userId);

		return newTokens;
	}
}

describe("authService", () => {
	let userRepository: IUserRepository;
	let jwtRepository: IJwtRepository;
	let jwtService: IJwtService;
	let authService: IAuthService;

	beforeEach(() => {
		userRepository = new UserRepository();
		jwtRepository = new JwtRepository();
		jwtService = new JwtService(jwtRepository);
		authService = new AuthService(userRepository, jwtService);
	});

	describe("login", () => {
		it("Deve fazer o login e retornar os tokens", async () => {
			const data = {
				email: "example@ex.com",
				password: "123456",
			};

			const token = await authService.login(data);

			expect(token).toHaveProperty("access");
			expect(token).toHaveProperty("refresh");
			expect(token.access.token).toBeDefined();
			expect(token.access.expiresIn).toBeDefined();
			expect(token.refresh.token).toBeDefined();
		});

		it("Deve retornar um erro se o email for inválido", async () => {
			const data = {
				email: "example@error.com",
				password: "123456",
			};

			await expect(authService.login(data)).rejects.toThrow(
				"E-mail ou senha inválidos",
			);
		});

		it("Deve retornar um erro se o password for inválido", async () => {
			const data = {
				email: "example@ex.com",
				password: "error",
			};

			await expect(authService.login(data)).rejects.toThrow(
				"E-mail ou senha inválidos",
			);
		});
	});

	describe("refreshToken", () => {
		it("Deve retornar um novo token ao refazer o refresh", async () => {
			const data = {
				email: "example@ex.com",
				password: "123456",
			};

			const tokens = await authService.login(data);

			const newToken = await authService.refreshToken(tokens.refresh.token);

			expect(newToken).toHaveProperty("access");
			expect(newToken).toHaveProperty("refresh");
			expect(newToken.access.token).toBeDefined();
			expect(newToken.access.expiresIn).toBeDefined();
			expect(newToken.refresh.token).toBeDefined();
		});

		it("Deve retornar um erro se o token for inválido", async () => {
			const token = "token inválido";

			await expect(authService.refreshToken(token)).rejects.toThrow(
				"Token inválido.",
			);
		});
	});
});
