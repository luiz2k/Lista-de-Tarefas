import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";

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

	public start(port: number): void {
		this.app.listen(port, (): void => {
			console.log(`Servidor iniciado na porta ${port}!`);
		});
	}
}
