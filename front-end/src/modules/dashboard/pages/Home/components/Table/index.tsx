"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { use } from "react";
import { HomeContext } from "../../context";
import { TableData } from "./components/TableData";

export function TaskTable() {
	const { tasksFound } = use(HomeContext);

	return (
		<div className="border rounded-md bg-background">
			<Table className="whitespace-nowrap">
				<TableHeader>
					<TableRow>
						<TableHead className="w-1/3 min-w-[120px]">Tarefa</TableHead>
						<TableHead className="w-1/3 min-w-[120px]">Status</TableHead>
						<TableHead className="w-1/3 min-w-[120px]">Data</TableHead>
						<TableHead className="w-1/3 min-w-[120px]" />
					</TableRow>
				</TableHeader>

				<TableBody>
					{tasksFound.length ? (
						<>
							{tasksFound.map((task) => (
								<TableData key={task._id} task={task} />
							))}
						</>
					) : (
						<TableRow>
							<TableCell colSpan={4} className="text-center">
								Nenhuma tarefa foi encontrada.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
