import "dotenv/config";
import "express-async-errors";
import { App } from "./app.js";
import { AppDataSource } from "./database/data-source.js";
import { authRoutes } from "./routes/authRoutes.js";
import { taskRoutes } from "./routes/taskRoutes.js";
import { userRoutes } from "./routes/userRoute.js";
import { env } from "./validations/envValidation.js";

async function main(): Promise<void> {
	try {
		await AppDataSource.initialize();

		const app = new App();

		app.config(env.CORS);

		app.routes("/user", userRoutes.getRoutes());
		app.routes("/auth", authRoutes.getRoutes());
		app.routes("/task", taskRoutes.getRoutes());

		app.swaggerDocumentation("/docs");
		app.errorHandler();

		app.start(env.PORT);
	} catch (error) {
		console.error(`ERROR NA INICIALIZAÇÃO DO SERVIDOR: ${error}`);
	}
}
main();
