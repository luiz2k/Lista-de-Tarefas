import { cookies } from "next/headers";

import type { Tokens } from "@/modules/auth/pages/SignIn/types";

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
