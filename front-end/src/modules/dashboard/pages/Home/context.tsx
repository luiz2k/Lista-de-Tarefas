"use client";

import { useDebounce } from "@/modules/shared/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";

import type { HomeContextType, Task } from "./types";

export const HomeContext = createContext<HomeContextType>(
	{} as HomeContextType,
);

// Contexto responsável pelo state das tarefas
export function HomeContextProvider({
	children,
	tasks,
}: {
	children: React.ReactNode;
	tasks: Task[];
}) {
	const [search, setSearch] = useState<string>("");
	const searchDebounce = useDebounce<string>(search);

	// Obtém o valor do parâmetro `filter` da url
	const searchParams = useSearchParams();
	const searchParam = searchParams?.get("filter");

	// Verifica se a query da url é `completed` ou `pending`
	const completeOrPending: boolean =
		searchParam === "completed" || searchParam === "pending";

	// Se `completeOrPending` for verdadeiro, filtra as tarefas pelo parâmetro da url
	// Se não, retorna todas as tarefas
	const filteredTasks = completeOrPending
		? tasks.filter((task) => task.status === searchParam)
		: tasks;

	// Se `searchDebounce` tiver conteúdo, filtra as tarefas pelo conteúdo
	// Se não, retorna todas as tarefas filtradas
	const tasksFound = searchDebounce
		? filteredTasks.filter((task) =>
				task.task.toLowerCase().includes(searchDebounce.toLowerCase()),
			)
		: filteredTasks;

	// Lida com a busca de tarefas
	const handleSearch = (search: string) => {
		setSearch(search);
	};

	return (
		<>
			<HomeContext.Provider
				value={{
					tasks,
					filteredTasks,
					searchParam,
					search,
					handleSearch,
					tasksFound,
				}}
			>
				{children}
			</HomeContext.Provider>
		</>
	);
}
