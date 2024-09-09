import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./docs/swaggerDocument";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import type { Express, Router } from "express";

export class App {
	private app: Express;

	constructor() {
		this.app = express();
	}

	public config(CORS: string): void {
		this.app.use(express.json()); // Configura o Express para trabalhar com JSON
		this.app.use(cors({ origin: CORS })); // Configura o CORS
	}

	// Configura as rotas
	public routes(path: string, routes: Router): void {
		this.app.use(path, routes);
	}

	// Middleware de tratamento de erros
	public errorHandler(): void {
		this.app.use(errorMiddleware.handle);
	}

	// Configura a documentação da API
	public swaggerDocumentation(path: string): void {
		this.app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	}

	// Inicia o servidor
	public start(port: number): void {
		this.app.listen(port, (): void => {
			console.log(`Servidor iniciado na porta ${port}!`);
		});
	}
}
