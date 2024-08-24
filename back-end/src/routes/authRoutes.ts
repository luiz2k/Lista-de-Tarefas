import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { JwtRepository } from "../repositories/jwtRepository";
import { UserRepository } from "../repositories/userRepository";
import { AuthService } from "../services/authService";
import { JwtService } from "../services/jwtService";

class AuthRoutes {
	private router: Router;
	private authController: AuthController;

	constructor() {
		const userRepository = new UserRepository();
		const jwtRepository = new JwtRepository();
		const jwtService = new JwtService(jwtRepository);
		const authService = new AuthService(userRepository, jwtService);

		this.authController = new AuthController(authService);

		this.router = Router();

		this.routes();
	}

	private routes() {
		this.router.post(
			"/login",
			this.authController.login.bind(this.authController),
		);

		this.router.post(
			"/refreshToken",
			this.authController.refreshToken.bind(this.authController),
		);
	}

	public getRoutes() {
		return this.router;
	}
}

export const authRoutes = new AuthRoutes();
