import "dotenv/config";
import "express-async-errors";
import { App } from "./app";
import { AppDataSource } from "./database/data-source";
import { authRoutes } from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import { userRoutes } from "./routes/userRoute";
import { env } from "./validations/envValidation";

async function main(): Promise<void> {
	try {
		// Faz a conexão com o banco de dados
		await AppDataSource.initialize();

		const app = new App();

		app.config(env.CORS);

		// Configura as rotas do projeto
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
