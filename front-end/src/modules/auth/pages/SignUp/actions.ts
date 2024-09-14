"use server";

import { API } from "@/modules/shared/utils/apiConnection";

import type { z } from "zod";
import type { createUserSchema } from "../../../shared/validations/userValidation";

export const createUser = async (
	data: z.infer<typeof createUserSchema>,
): Promise<void> => {
	await API.request({
		method: "POST",
		path: "/user",
		body: JSON.stringify(data),
	});
};
