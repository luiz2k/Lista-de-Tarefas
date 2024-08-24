import { getSession } from "@/modules/shared/helpers/getSession";
import { API } from "@/modules/shared/utils/apiConnection";

import type { HttpResponse } from "@/modules/shared/services/httpClientAdapter/interfaces/IHttpClientAdapter";
import type { Task } from "./types";

export const getAllTasks = async (): Promise<HttpResponse<Task[]>> => {
	const session = getSession();

	const response = await API.request<Task[]>({
		method: "GET",
		path: "/task",
		headers: {
			Authorization: `Bearer ${session?.access?.token}`,
		},
		tag: "getAllTasks",
	});

	return response;
};
