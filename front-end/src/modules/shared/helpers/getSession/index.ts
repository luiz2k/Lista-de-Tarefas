import { cookies } from "next/headers";

import type { Tokens } from "@/modules/auth/pages/SignIn/types";

// Obtém os dados de sessão do usuário
export const getSession = (): Tokens | null => {
	try {
		const sessionCookie = cookies().get("session")?.value;

		if (!sessionCookie) {
			throw Error;
		}

		return JSON.parse(sessionCookie);
	} catch {
		return null;
	}
};
