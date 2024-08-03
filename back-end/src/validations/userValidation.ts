import z from "zod";

export const createUserSchema = z
	.object({
		username: z
			.string()
			.min(1, "O nome deve ter pelo menos 1 caractere.")
			.max(15, "O nome deve ter no máximo 15 caracteres."),
		email: z
			.string()
			.email("Informe um e-mail válido.")
			.transform((email) => email.toLowerCase()),
		password: z.string().min(6, "A senha deve ter pelo menos 6 digitos."),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});

export const updateUserSchema = z.object({
	username: z
		.string()
		.min(1, "O nome deve ter pelo menos 1 caractere.")
		.max(15, "O nome deve ter no máximo 15 caracteres.")
		.optional(),
	email: z
		.string()
		.email("Informe um e-mail válido.")
		.transform((email) => email.toLowerCase())
		.optional(),
	password: z
		.string()
		.min(6, "A senha deve ter pelo menos 6 digitos.")
		.optional(),
});
