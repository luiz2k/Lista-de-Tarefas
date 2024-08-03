import { NextResponse } from "next/server";
import { getSession } from "./modules/shared/helpers/getSession";
import { refreshToken } from "./modules/shared/services/refreshToken";

import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
	try {
		const session = getSession();

		const pathname = req.nextUrl.pathname;

		const authPage = pathname === "/registro" || pathname === "/entrar";

		if (!session) {
			if (authPage) {
				return NextResponse.next();
			}

			return NextResponse.redirect(new URL("/entrar", req.url));
		}

		if (authPage) {
			return NextResponse.redirect(new URL("/", req.url));
		}

		const expiresIn = session.access.expiresIn;
		const TWO_MINUTES = 2000 * 60;
		const currentDate = Date.now();

		const tokenExpired = currentDate >= expiresIn - TWO_MINUTES;

		if (tokenExpired) {
			const response = await refreshToken(session.refresh.token);

			const middResponse = NextResponse.next();

			middResponse.cookies.set("session", JSON.stringify(response.data), {
				httpOnly: true,
			});

			return middResponse;
		}
	} catch {
		const middResponse = NextResponse.next();

		middResponse.cookies.delete("session");

		return middResponse;
	}
}

export const config = {
	matcher: ["/", "/entrar", "/registro"],
};
