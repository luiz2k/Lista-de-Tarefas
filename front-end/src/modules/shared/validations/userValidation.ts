import z from "zod";

// Valida o formulário de cadastro
export const createUserSchema = z
	.object({
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
