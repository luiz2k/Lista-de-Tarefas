import { z } from "zod";

// Validação das variáveis de ambiente
const envSchema = z.object({
	API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
