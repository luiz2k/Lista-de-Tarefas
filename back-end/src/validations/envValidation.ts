import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	CORS: z.string().url(),
	ACCESS_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),
	DB_HOST: z.string(),
	DB_PORT: z.string().transform((port) => Number(port)),
	DB_USERNAME: z.string(),
	DB_PASSWORD: z.string(),
	DB_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
