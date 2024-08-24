import { redirect } from "next/navigation";
import { createQueryString } from "../../utils/createQueryString";

import type {
	HttpRequest,
	HttpResponse,
	IHttpClientAdapter,
} from "./interfaces/IHttpClientAdapter";

class HttpClientAdapter implements IHttpClientAdapter {
	constructor(private readonly baseUrl: string) {}

	public async request<R>(requestData: HttpRequest): Promise<HttpResponse<R>> {
		const response = await fetch(`${this.baseUrl}${requestData.path}`, {
			method: requestData.method,
			body: requestData.body,
			headers: {
				"Content-Type": "application/json",
				...requestData.headers,
			},
			next: { tags: [requestData.tag || "default"] },
			cache: requestData.cache || "force-cache",
		});

		const data = await response.json();

		if (data.statusCode === 401 && data.message === "Token inválido.") {
			const query = createQueryString("status", "expired");

			redirect(`/entrar?${query}`);
		}

		return data;
	}
}

export const HttpFactory = (baseUrl: string): IHttpClientAdapter =>
	new HttpClientAdapter(baseUrl);
