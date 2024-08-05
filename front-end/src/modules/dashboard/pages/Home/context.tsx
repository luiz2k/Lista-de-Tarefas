"use client";

import { useDebounce } from "@/modules/shared/hooks/useDebounce";
import { useSearchParams } from "next/navigation";
import { createContext, useState } from "react";

import type { HomeContextType, Task } from "./types";

export const HomeContext = createContext<HomeContextType>(
	{} as HomeContextType,
);

export function HomeContextProvider({
	children,
	tasks,
}: {
	children: React.ReactNode;
	tasks: Task[];
}) {
	const [search, setSearch] = useState<string>("");
	const searchDebounce = useDebounce<string>(search);

	const searchParams = useSearchParams();
	const searchParam = searchParams?.get("filter");

	const filter =
		searchParam === "completed"
			? true
			: searchParam === "pending"
				? false
				: "all";

	const completeOrPending: boolean = filter === true || filter === false;

	const filteredTasks = completeOrPending
		? tasks.filter((task) => task.completed === filter)
		: tasks;

	const tasksFound = filteredTasks.filter((task) =>
		task.task.toLowerCase().includes(searchDebounce.toLowerCase()),
	);

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
