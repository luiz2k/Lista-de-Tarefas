export const user = {
	"/user": {
		post: {
			tags: ["user"],
			summary: "Cria um novo usuário.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/createUser",
						},
						examples: {
							user: {
								value: {
									username: "John Doe",
									email: "Hx1Jt@example.com",
									password: "123456",
									confirmPassword: "123456",
								},
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: "Usuário criado com sucesso.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/createdUser",
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
				409: {
					description: "E-mail já cadastrado.",
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
			tags: ["user"],
			summary: "Atualiza os dados de um usuário.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/updateUser",
						},
						examples: {
							user: {
								value: {
									username: "John Doe",
									email: "Hx1Jt@example.com",
									password: "123456",
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: "Usuário atualizado com sucesso.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/updatedUser",
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
					description: "Usuário não encontrado.",
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

user["/user"]