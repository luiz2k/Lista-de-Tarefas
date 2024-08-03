import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const objectIdSchema = z.string().refine(
	(value) => {
		const isValid = isValidObjectId(value);

		if (!isValid) {
			return false;
		}

		return true;
	},
	{ message: "O ID informado é inválido." },
);
