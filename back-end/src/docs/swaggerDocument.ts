import { schemas } from "./components/schemas.js";
import { securitySchemes } from "./components/securitySchemes.js";
import { auth } from "./paths/auth.js";
import { task } from "./paths/task.js";
import { user } from "./paths/user.js";

export const swaggerDocument = {
	openapi: "3.0.3",
	info: {
		title: "Lista de Tarefas",
		description: "API para gerenciamento de tarefas.",
	},

	components: {
		schemas,
		securitySchemes,
	},

	paths: {
		...auth,
		...user,
		...task,
	},
};
