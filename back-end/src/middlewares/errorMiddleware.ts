/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextFunction, Request, Response } from "express";
import type { GenericError } from "../helpers/errorHandler";

class ErrorMiddleware {
	public handle(
		error: Error & GenericError,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) {
		const statusCode: number = error.statusCode ?? 500;
		const zodErrors = error.zodErrors;

		const message: string = error.statusCode
			? error.message
			: "Erro interno do servidor.";

		return res.status(error.statusCode).json({
			statusCode: statusCode,
			message: message,
			paths: zodErrors,
		});
	}
}

export const errorMiddleware = new ErrorMiddleware();
