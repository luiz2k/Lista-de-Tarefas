import { CheckCheck } from "lucide-react";
import { updateTask } from "../../../../../../../actions";

import type { UpdateTask } from "../../../../../../../types";

export function TableControlStatus({
	taskId,
	completed,
}: {
	taskId: string;
	completed: boolean;
}) {
	const handleTaskUpdate = async (userId: string, data: UpdateTask) => {
		await updateTask(userId, data);
	};
	return (
		<button
			type="button"
			onClick={() =>
				handleTaskUpdate(taskId, {
					completed: !completed,
				})
			}
			className="flex items-center justify-center gap-1.5 hover:underline"
		>
			<CheckCheck size="14" /> STATUS
		</button>
	);
}
