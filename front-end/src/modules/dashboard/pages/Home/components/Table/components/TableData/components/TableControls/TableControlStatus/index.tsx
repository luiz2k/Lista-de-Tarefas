import { CheckCheck } from "lucide-react";
import { updateTask } from "../../../../../../../actions";
import { TaskStatus } from "../../../../../../../types";

import type { UpdateTask } from "../../../../../../../types";

export function TableControlStatus({
	taskId,
	status,
}: {
	taskId: string;
	status: TaskStatus;
}) {
	const handleTaskUpdate = async (userId: string, data: UpdateTask) => {
		const newStatus =
			data.status === "completed" ? TaskStatus.Pending : TaskStatus.Completed;

		await updateTask(userId, { status: newStatus });
	};
	return (
		<button
			type="button"
			onClick={() =>
				handleTaskUpdate(taskId, {
					status,
				})
			}
			className="flex items-center justify-center gap-1.5 hover:underline"
		>
			<CheckCheck size="14" /> Status
		</button>
	);
}
