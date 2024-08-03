"use client";

import { Button } from "@/components/ui/button";
import { createQueryString } from "@/modules/shared/utils/createQueryString";
import { usePathname, useRouter } from "next/navigation";
import { use } from "react";
import { HomeContext } from "../../context";

export function Filter() {
	const { tasks, searchParam: search } = use(HomeContext);

	const router = useRouter();
	const pathname = usePathname();

	const filter =
		search === "completed" ? true : search === "pending" ? false : "all";

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
			<Button
				variant={filter === "all" ? "default" : "outline"}
				onClick={() => {
					router.push(`${pathname}?${createQueryString("filter", "all")}`);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Todas as tarefas</span>
				<span className="font-bold text-xl block">{tasks.length}</span>
			</Button>

			<Button
				variant={filter === true ? "default" : "outline"}
				onClick={() => {
					router.push(
						`${pathname}?${createQueryString("filter", "completed")}`,
					);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Completas</span>
				<span className="font-bold text-xl block">
					{tasks.filter((task) => task.completed === true).length}
				</span>
			</Button>

			<Button
				variant={filter === false ? "default" : "outline"}
				onClick={() => {
					router.push(`${pathname}?${createQueryString("filter", "pending")}`);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Pendentes</span>
				<span className="font-bold text-xl block">
					{tasks.filter((task) => task.completed === false).length}
				</span>
			</Button>
		</div>
	);
}
