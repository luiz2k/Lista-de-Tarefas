import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteTask } from "../../../../../../../actions";

export function TableControlDelete({ taskId }: { taskId: string }) {
	const [btnStatus, setBtnStatus] = useState<boolean>(false);

	const handleTaskDelete = async (userId: string) => {
		setBtnStatus(true);

		await deleteTask(userId);

		setBtnStatus(false);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					type="button"
					className="flex items-center justify-center gap-1.5 hover:underline"
				>
					<Trash2 size="14" /> Apagar
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[425px] bottom-0 top-auto translate-y-0 sm:bottom-auto sm:top-[50%] sm:translate-y-[-50%]">
				<AlertDialogHeader>
					<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta operação não pode ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						disabled={btnStatus}
						onClick={() => handleTaskDelete(taskId)}
					>
						{btnStatus && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Apagar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
