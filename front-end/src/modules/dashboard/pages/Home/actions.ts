"use server";

import { getSession } from "@/modules/shared/helpers/getSession";
import { API } from "@/modules/shared/utils/apiConnection";
import { revalidatePath, revalidateTag } from "next/cache";

import type { HttpResponse } from "@/modules/shared/services/httpClientAdapter/interfaces/IHttpClientAdapter";
import type { CreateTask, Task, UpdateTask } from "./types";

export const getAllTasks = async (): Promise<HttpResponse<Task[]>> => {
	const session = getSession();

	const response = await API.request<Task[]>({
		method: "GET",
		path: "/task",
		headers: {
			Authorization: `Bearer ${session?.access?.token}`,
		},
		tag: "getAllTasks",
		cache: "no-store",
	});

	return response;
};

export const createTask = async (data: CreateTask): Promise<void> => {
	const session = getSession();

	await API.request({
		method: "POST",
		path: "/task",
		body: JSON.stringify(data),
		headers: {
			Authorization: `Bearer ${session?.access?.token}`,
		},
	});

	revalidateTag("getAllTasks");
};

export const updateTask = async (
	taskId: string,
	data: UpdateTask,
): Promise<void> => {
	const session = getSession();

	await API.request({
		method: "PATCH",
		path: `/task/${taskId}`,
		body: JSON.stringify(data),
		headers: {
			Authorization: `Bearer ${session?.access?.token}`,
		},
	});

	revalidatePath("/");
};

export const deleteTask = async (taskId: string): Promise<void> => {
	const session = getSession();

	await API.request({
		method: "DELETE",
		path: `/task/${taskId}`,
		headers: {
			Authorization: `Bearer ${session?.access?.token}`,
		},
	});

	revalidateTag("getAllTasks");
};
