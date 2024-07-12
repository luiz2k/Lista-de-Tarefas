export const schemas = {
	createUser: {
		type: "object",
		properties: {
			username: {
				type: "string",
				description: "Nome do usuário.",
			},
			email: {
				type: "string",
				description: "Email do usuário.",
			},
			password: {
				type: "string",
				description: "Senha do usuário.",
			},
			confirmPassword: {
				type: "string",
				description: "Confirmação da senha do usuário.",
			},
		},
		required: ["username", "email", "password", "confirmPassword"],
	},
	createdUser: {
		type: "object",
		properties: {
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			data: {
				type: "object",
				properties: {
					username: {
						type: "string",
						description: "Nome do usuário.",
					},
					email: {
						type: "string",
						description: "Email do usuário.",
					},
				},
			},
		},
	},

	updateUser: {
		type: "object",
		properties: {
			username: {
				type: "string",
				description: "Nome do usuário.",
			},
			email: {
				type: "string",
				description: "Email do usuário.",
			},
			password: {
				type: "string",
				description: "Senha do usuário.",
			},
		},
	},
	updatedUser: {
		type: "object",
		properties: {
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			data: {
				type: "object",
				properties: {
					username: {
						type: "string",
						description: "Nome do usuário.",
					},
					email: {
						type: "string",
						description: "Email do usuário.",
					},
					password: {
						type: "string",
						description: "Senha do usuário.",
					},
				},
			},
		},
	},

	createTask: {
		type: "object",
		properties: {
			task: {
				type: "string",
				description: "Nome da tarefa.",
			},
		},
		required: ["task"],
	},
	task: {
		type: "object",
		properties: {
			message: {
				type: "string",
				description: "Mensagem do retorno",
			},
			data: {
				type: "array",
				items: {
					type: "object",
					properties: {
						task: {
							type: "string",
							description: "Nome da tarefa.",
						},
						completed: {
							type: "boolean",
							description: "Status da tarefa.",
						},
						createdAt: {
							type: "string",
							format: "date",
							description: "Data de criação da tarefa.",
						},
					},
				},
			},
		},
	},
	createdTask: {
		type: "object",
		properties: {
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			data: {
				type: "object",
				properties: {
					task: {
						type: "string",
						description: "Nome da tarefa.",
					},
					completed: {
						type: "boolean",
						description: "Status da tarefa.",
					},
					createdAt: {
						type: "string",
						format: "date",
						description: "Data de criação da tarefa.",
					},
				},
			},
		},
	},
	updateTask: {
		type: "object",
		properties: {
			task: {
				type: "string",
				description: "Nome da tarefa.",
			},
			completed: {
				type: "boolean",
				description: "Status da tarefa.",
			},
		},
	},
	updatedTask: {
		type: "object",
		properties: {
			message: {
				type: "string",
				description: "Mensagem do retorno",
			},
			data: {
				type: "array",
				items: {
					type: "object",
					properties: {
						task: {
							type: "string",
							description: "Nome da tarefa.",
						},
						completed: {
							type: "boolean",
							description: "Status da tarefa.",
						},
					},
				},
			},
		},
	},
	taskDeleted: {
		type: "object",
		properties: {
			message: {
				type: "string",
				description: "Mensagem do retorno.",
			},
		},
	},

	login: {
		type: "object",
		properties: {
			email: {
				type: "string",
				description: "Email do usuário.",
			},
			password: {
				type: "string",
				description: "Senha do usuário.",
			},
		},
		required: ["email", "password"],
	},
	refreshToken: {
		type: "object",
		properties: {
			refreshToken: {
				type: "string",
				description: "Token de refresh.",
			},
		},
		required: ["refreshToken"],
	},
	Logged: {
		type: "object",
		properties: {
			message: {
				type: "string",
				description: "Mensagem do retorno.",
			},
			data: {
				type: "object",
				properties: {
					access: {
						type: "object",
						properties: {
							token: {
								type: "string",
								description: "Token de acesso.",
							},
							expiresIn: {
								type: "string",
								format: "date",
								description: "Data de expiração.",
							},
						},
					},
					refresh: {
						type: "object",
						properties: {
							token: {
								type: "string",
								description: "Token de acesso.",
							},
						},
					},
				},
			},
		},
	},

	error: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
		},
	},
	validationError: {
		type: "object",
		properties: {
			statusCode: {
				type: "number",
				description: "Código do status HTTP.",
			},
			message: {
				type: "string",
				description: "Mensagem da resposta.",
			},
			paths: {
				type: "array",
				description: "Caminhos dos erros.",
				items: {
					type: "object",
					properties: {
						path: {
							type: "string",
							description: "Em qual chave o erro aconteceu.",
						},
						message: {
							type: "string",
							description: "Mensagem da resposta.",
						},
					},
				},
			},
		},
	},
};
