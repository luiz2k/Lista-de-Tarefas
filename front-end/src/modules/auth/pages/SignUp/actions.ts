"use server";

import { API } from "@/modules/shared/utils/apiConnection";

import type { z } from "zod";
import type { createUserSchema } from "../../../shared/validations/userValidation";

export const createUser = async (
	data: z.infer<typeof createUserSchema>,
): Promise<void> => {
	const response = await API.request({
		method: "POST",
		path: "/user",
		body: JSON.stringify(data),
	});

	if (response.statusCode === 409) {
		throw new Error(response.message);
	}
};
