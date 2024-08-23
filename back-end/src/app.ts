import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swaggerDocument.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import type { Express, Router } from "express";

export class App {
	private app: Express;

	constructor() {
		this.app = express();
	}

	public config(CORS: string): void {
		this.app.use(express.json());
		this.app.use(cors({ origin: CORS }));
	}

	public routes(path: string, routes: Router): void {
		this.app.use(path, routes);
	}

	public errorHandler(): void {
		this.app.use(errorMiddleware.handle);
	}

	public swaggerDocumentation(path: string): void {
		this.app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	}

	public start(port: number): void {
		this.app.listen(port, (): void => {
			console.log(`Servidor iniciado na porta ${port}!`);
		});
	}
}
