import { TableCell, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { TableControlDelete } from "./components/TableControls/TableControlDelete";
import { TableControlStatus } from "./components/TableControls/TableControlStatus";
import { TableControlUpdate } from "./components/TableControls/TableControlUpdate";

import type { TableRowsProps } from "./types";

export function TableData({ task }: TableRowsProps) {
	return (
		<TableRow key={task.id}>
			<TableCell className="font-medium">
				{task.status === "completed" ? (
					<span className="line-through">{task.task}</span>
				) : (
					<p>{task.task}</p>
				)}
			</TableCell>

			<TableCell>
				{task.status === "completed" ? (
					<span className="flex items-center gap-1.5">
						<Check size="14" />
						Concluído
					</span>
				) : (
					<span className="flex items-center gap-1.5">
						<X size="14" />
						Pendente
					</span>
				)}
			</TableCell>

			<TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>

			<TableCell className="gap-x-2.5 flex items-center justify-center">
				<TableControlUpdate task={task.task} taskId={task.id} />

				<TableControlStatus taskId={task.id} status={task.status} />

				<TableControlDelete taskId={task.id} />
			</TableCell>
		</TableRow>
	);
}
