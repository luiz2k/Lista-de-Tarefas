import { TableCell, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { TableControlDelete } from "./components/TableControls/TableControlDelete";
import { TableControlStatus } from "./components/TableControls/TableControlStatus";
import { TableControlUpdate } from "./components/TableControls/TableControlUpdate";

import type { TableRowsProps } from "./types";

export function TableData({ task }: TableRowsProps) {
	return (
		<TableRow key={task._id}>
			<TableCell className="font-medium">
				{task.completed ? (
					<span className="line-through">{task.task}</span>
				) : (
					<p>{task.task}</p>
				)}
			</TableCell>

			<TableCell>
				{task.completed === true ? (
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
				<TableControlUpdate task={task.task} taskId={task._id} />

				<TableControlStatus taskId={task._id} completed={task.completed} />

				<TableControlDelete taskId={task._id} />
			</TableCell>
		</TableRow>
	);
}
