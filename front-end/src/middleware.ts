import { NextResponse } from "next/server";
import { API } from "./modules/shared/utils/ApiConnection";

import type { NextRequest } from "next/server";
import type { Tokens } from "./modules/auth/pages/SignIn/types";

const handleRefreshToken = async (refreshToken: string) => {
	try {
		const response = await API.request<Tokens>({
			method: "POST",
			path: "/auth/refreshToken",
			body: JSON.stringify({
				refreshToken: refreshToken,
			}),
			cache: "no-store",
		});

		if (response.statusCode === 400 && response.message === "Token inválido.") {
			throw new Error();
		}

		const res = NextResponse.next();

		res.cookies.set("session", JSON.stringify(response.data), {
			httpOnly: true,
		});

		return res;
	} catch {
		const res = NextResponse.next();

		res.cookies.delete("session");

		return res;
	}
};

export default async function middleware(req: NextRequest) {
	const tokens = req.cookies.get("session")?.value || "";

	const authPage =
		req.nextUrl.pathname === "/registro" || req.nextUrl.pathname === "/entrar";

	if (!tokens) {
		if (authPage) {
			return NextResponse.next();
		}

		return NextResponse.redirect(new URL("/entrar", req.url));
	}

	if (authPage) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	try {
		const session: Tokens = JSON.parse(tokens);

		const expiresIn = session.access.expiresIn;
		const ONE_MINUTE = 1000 * 60;
		const currentDate = Date.now();

		const tokenExpired = currentDate >= expiresIn - ONE_MINUTE;

		if (tokenExpired) {
			return await handleRefreshToken(session.refresh.token);
		}
	} catch {
		const res = NextResponse.redirect(new URL("/entrar", req.url));

		res.cookies.delete("session");

		return res;
	}
}

export const config = {
	matcher: ["/", "/entrar", "/registro"],
};
