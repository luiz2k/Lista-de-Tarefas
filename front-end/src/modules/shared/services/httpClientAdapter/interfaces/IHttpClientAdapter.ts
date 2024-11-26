export type HttpRequest = {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	path: string;
	body?: BodyInit;
	headers?: HeadersInit;
	tag?: string;
	cache?: RequestCache;
};

export type HttpResponse<R> = {
	statusCode: number;
	message: string;
	error?: boolean;
	data: R;
};

export interface IHttpClientAdapter {
	request<R>(data: HttpRequest): Promise<HttpResponse<R>>;
}
