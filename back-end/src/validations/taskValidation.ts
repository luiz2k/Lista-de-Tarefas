import z from "zod";

export const createTaskSchema = z.object({
	task: z
		.string()
		.min(1, "Por favor, digite uma tarefa.")
		.max(20, "A tarefa deve ter no máximo 20 caracteres."),
});

export const updateTaskSchema = z.object({
	task: z
		.string()
		.min(1, "Por favor, digite uma tarefa.")
		.max(20, "A tarefa deve ter no máximo 20 caracteres.")
		.optional(),
	completed: z.boolean().optional(),
});
