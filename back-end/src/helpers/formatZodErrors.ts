import type { ZodIssue } from "zod";
import type { ZodErrors } from "../types/error";

export function formatZodErrors(errors: ZodIssue[]): ZodErrors[] {
	const formattedError = errors.map((error) => ({
		path: error.path.join("."),
		message: error.message,
	}));

	return formattedError;
}
