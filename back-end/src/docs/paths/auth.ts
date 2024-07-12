export const auth = {
	"/auth/login": {
		post: {
			tags: ["auth"],
			summary: "Realiza o login.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/login",
						},
					},
				},
			},
			responses: {
				200: {
					description: "Token de acesso gerado.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Logged",
							},
						},
					},
				},
				401: {
					description: "E-mail ou senha inválidoos.",
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
	"/auth/refreshToken": {
		post: {
			tags: ["auth"],
			summary: "Realiza o refresh do token.",
			requestBody: {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/refreshToken",
						},
					},
				},
			},
			responses: {
				200: {
					description: "Token de acesso atualizado.",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/Logged",
							},
						},
					},
				},
				400: {
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
