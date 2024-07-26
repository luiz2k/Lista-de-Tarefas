import z from "zod";

export const createUserSchema = z
	.object({
		username: z
			.string({ message: "Campo obrigatório." })
			.min(2, "O nome deve ter pelo menos 2 caractere.")
			.max(15, "O nome deve ter no máximo 15 caracteres."),
		email: z
			.string({ message: "Campo obrigatório." })
			.email("Informe um e-mail válido.")
			.transform((email) => email.toLowerCase()),
		password: z
			.string({ message: "Campo obrigatório." })
			.min(6, "A senha deve ter pelo menos 6 digitos."),
		confirmPassword: z.string({ message: "Campo obrigatório." }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});
