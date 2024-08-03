import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.email("Informe um e-mail válido.")
		.transform((email) => email.toLowerCase()),
	password: z.string().min(6, "A senha deve ter pelo menos 6 digitos."),
});

export const refreshTokenSchema = z.object({
	refreshToken: z.string(),
});
