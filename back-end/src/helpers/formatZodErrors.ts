import type { ZodIssue } from "zod";
import type { ZodErrors } from "../types/error";

// Formata as mensagens de erro do Zod
export function formatZodErrors(errors: ZodIssue[]): ZodErrors[] {
	const formattedError = errors.map((error) => ({
		path: error.path.join("."),
		message: error.message,
	}));

	return formattedError;
}
