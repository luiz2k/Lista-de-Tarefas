import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	CORS: z.string().url(),
	ACCESS_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),
	MONGODB_URI: z.string().url(),
});

export const env = envSchema.parse(process.env);
