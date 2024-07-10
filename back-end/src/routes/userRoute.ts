import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

class UserRoutes {
	private router: Router;
	private userController: UserController;

	constructor() {
		const userRepository = new UserRepository();
		const userService = new UserService(userRepository);

		this.userController = new UserController(userService);

		this.router = Router();

		this.routes();
	}

	private routes() {
		this.router.post("/", this.userController.create.bind(this.userController));

		this.router.use(authMiddleware.handle.bind(authMiddleware));

		this.router.get("/", this.userController.findOne.bind(this.userController));

		this.router.patch(
			"/",
			this.userController.update.bind(this.userController),
		);
	}

	public getRoutes() {
		return this.router;
	}
}

export const userRoutes = new UserRoutes();
