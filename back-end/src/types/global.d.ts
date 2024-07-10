import type { Payload } from "./jwt";

declare global {
	namespace Express {
		interface Request {
			user?: Payload;
		}
	}
}
