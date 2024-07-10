import "express-async-errors";
import { App } from "./app";
import { databaseConnect } from "./database/mongoDB";
import { authRoutes } from "./routes/authRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import { userRoutes } from "./routes/userRoute";
import { env } from "./validations/envValidation";

async function main(): Promise<void> {
	await databaseConnect();

	const app = new App();

	app.config(env.CORS);

	app.routes("/user", userRoutes.getRoutes());
	app.routes("/auth", authRoutes.getRoutes());
	app.routes("/task", taskRoutes.getRoutes());

	app.errorHandler();

	app.start(env.PORT);
}
main();
