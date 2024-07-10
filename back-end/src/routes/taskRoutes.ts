import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { TaskRepository } from "../repositories/taskRepository";
import { TaskService } from "../services/taskService";

class TaskRoutes {
	private router: Router;
	private taskController: TaskController;

	constructor() {
		const taskRepository = new TaskRepository();
		const taskService = new TaskService(taskRepository);

		this.taskController = new TaskController(taskService);

		this.router = Router();

		this.routes();
	}

	private routes(): void {
		this.router.use(authMiddleware.handle.bind(authMiddleware));

		this.router.post("/", this.taskController.create.bind(this.taskController));

		this.router.get(
			"/:id",
			this.taskController.findOne.bind(this.taskController),
		);

		this.router.get("/", this.taskController.findAll.bind(this.taskController));

		this.router.patch(
			"/:id",
			this.taskController.update.bind(this.taskController),
		);

		this.router.delete(
			"/:id",
			this.taskController.remove.bind(this.taskController),
		);
	}

	public getRoutes(): Router {
		return this.router;
	}
}

export const taskRoutes = new TaskRoutes();
