import { z } from "zod";

// Validação do formulário de login
export const loginSchema = z.object({
	email: z
		.string({ message: "Campo obrigatório." })
		.email("Informe um e-mail válido.")
		.transform((email) => email.toLowerCase()),
	password: z
		.string({ message: "Campo obrigatório." })
		.min(6, "A senha deve ter pelo menos 6 digitos."),
});

export const refreshTokenSchema = z.object({
	refreshToken: z.string(),
});
