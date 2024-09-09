// Classes responsável por gerar instâncias de erros de acordo com o tipo de erro

import { formatZodErrors } from "./formatZodErrors";

import type { ZodIssue } from "zod";
import type { ZodErrors } from "../types/error";


// Classe base para todos os outros tipos de erros
export class GenericError extends Error {
	public readonly zodErrors: ZodErrors[] | undefined;

	constructor(
		public readonly statusCode: number,
		public readonly message: string,
		zodErrors?: ZodIssue[],
	) {
		const formattedErrors = zodErrors && formatZodErrors(zodErrors);

		super(message);

		this.statusCode = statusCode;
		this.zodErrors = formattedErrors;
	}
}

export class BadRequestError extends GenericError {
	constructor(
		public readonly message: string,
		zodErrors?: ZodIssue[],
	) {
		const statusCode: number = 400;

		super(statusCode, message, zodErrors);
	}
}

export class UnauthorizedError extends GenericError {
	constructor(message: string) {
		const statusCode: number = 401;

		super(statusCode, message);
	}
}

export class ForbiddenError extends GenericError {
	constructor(message: string) {
		const statusCode: number = 403;

		super(statusCode, message);
	}
}

export class NotFoundError extends GenericError {
	constructor(message: string) {
		const statusCode: number = 404;

		super(statusCode, message);
	}
}

export class ConflictError extends GenericError {
	constructor(message: string) {
		const statusCode: number = 409;

		super(statusCode, message);
	}
}
