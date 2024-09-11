"use client";

import { Button } from "@/components/ui/button";
import { createQueryString } from "@/modules/shared/utils/createQueryString";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { HomeContext } from "../../context";

export function Filter() {
	const { tasks, searchParam } = useContext(HomeContext);

	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
			<Button
				variant={searchParam === "all" ? "default" : "outline"}
				onClick={() => {
					router.push(`${pathname}?${createQueryString("filter", "all")}`);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Todas as tarefas</span>
				<span className="font-bold text-xl block">{tasks.length}</span>
			</Button>

			<Button
				variant={searchParam === "completed" ? "default" : "outline"}
				onClick={() => {
					router.push(
						`${pathname}?${createQueryString("filter", "completed")}`,
					);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Completas</span>
				<span className="font-bold text-xl block">
					{tasks.filter((task) => task.status === "completed").length}
				</span>
			</Button>

			<Button
				variant={searchParam === "pending" ? "default" : "outline"}
				onClick={() => {
					router.push(`${pathname}?${createQueryString("filter", "pending")}`);
				}}
				className="p-5 h-full block w-full"
			>
				<span>Pendentes</span>
				<span className="font-bold text-xl block">
					{tasks.filter((task) => task.status === "pending").length}
				</span>
			</Button>
		</div>
	);
}
