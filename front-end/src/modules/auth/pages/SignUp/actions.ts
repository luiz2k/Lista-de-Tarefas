"use server";

import { API } from "@/modules/shared/utils/apiConnection";

import type { ErrorException } from "@/modules/shared/types/errorException";
import type { z } from "zod";
import type { createUserSchema } from "../../../shared/validations/userValidation";

// Cria um novo usuário
export const createUser = async (
	data: z.infer<typeof createUserSchema>,
): Promise<undefined | ErrorException> => {
	const response = await API.request({
		method: "POST",
		path: "/user",
		body: JSON.stringify(data),
	});

	if (response.error) {
		return {
			error: response.error,
			message: response.message,
			statusCode: response.statusCode,
		};
	}
};
