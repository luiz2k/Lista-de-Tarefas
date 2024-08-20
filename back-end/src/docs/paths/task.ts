export const task = {
	"/task": {
		post: {
			tags: ["task"],
			security: [{ bearerAuth: [] }],
			summary: "Cria uma nova tarefa.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/createTask",
						},
						examples: {
							user: {
								value: {
									task: "Fazer compras",
								},
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: "Tarefa criada com sucesso.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/createdTask",
							},
						},
					},
				},
				401: {
					description: "Token inválido.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				},
				400: {
					description: "Erro na validação dos dados.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/validationError",
							},
						},
					},
				},
			},
		},
		get: {
			tags: ["task"],
			security: [{ bearerAuth: [] }],
			summary: "Retorna todas as tarefa.",
			responses: {
				200: {
					description: "Tarefas encontradas.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/task",
							},
						},
					},
				},
				401: {
					description: "Token inválido.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				},
			},
		},
	},
	"/task/{id}": {
		get: {
			tags: ["task"],
			security: [{ bearerAuth: [] }],
			summary: "Retorna uma tarefa.",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					description: "ID da tarefa.",
				},
			],
			responses: {
				200: {
					description: "Tarefa encontrada.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/createdTask",
							},
						},
					},
				},
				400: {
					description: "Erro na validação dos dados.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/validationError",
							},
						},
					},
				},
				404: {
					description: "Tarefa não encontrada.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				},
				401: {
					description: "Token inválido.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				},
			},
		},
		patch: {
			tags: ["task"],
			security: [{ bearerAuth: [] }],
			summary: "Atualizar uma tarefa.",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					description: "ID da tarefa.",
				},
			],
			requestBody: {
				required: false,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/updateTask",
						},
						examples: {
							task: {
								value: {
									task: "Fazer compras",
									completed: true,
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: "Tarefa atualizada com sucesso.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/updatedTask",
							},
						},
					},
				},
				400: {
					description: "Erro na validação dos dados.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/validationError",
							},
						},
					},
				},
				401: {
					description: "Token inválido.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				},
			},
		},
		delete: {
			tags: ["task"],
			security: [{ bearerAuth: [] }],
			summary: "Deleta uma tarefa.",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					description: "ID da tarefa.",
				},
			],
			responses: {
				200: {
					description: "Tarefa atualizada com sucesso.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/taskDeleted",
							},
						},
					},
				},
				400: {
					description: "Erro na validação dos dados.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/validationError",
							},
						},
					},
				},
				401: {
					description: "Token inválido.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/error",
							},
						},
					},
				},
			},
		},
	},
};
