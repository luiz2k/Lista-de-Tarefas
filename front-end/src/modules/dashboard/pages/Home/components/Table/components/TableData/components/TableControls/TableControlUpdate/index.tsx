import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateTaskSchema } from "@/modules/shared/validations/taskValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateTask } from "../../../../../../../actions";

import type { z } from "zod";

export function TableControlUpdate({
	task,
	taskId,
}: { task: string; taskId: string }) {
	const [open, setOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof updateTaskSchema>>({
		resolver: zodResolver(updateTaskSchema),
		defaultValues: {
			task: "",
			completed: false,
		},
	});

	const handleEditTask = (task: string) => {
		form.setValue("task", task);

		setOpen(true);
	};

	const onSubmit = async (
		taskId: string,
		data: z.infer<typeof updateTaskSchema>,
	) => {
		if (data.task === task) {
			form.setError("task", {
				type: "custom",
				message: "A tarefa deve ser alterada.",
			});

			return;
		}

		await updateTask(taskId, data);

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					type="button"
					onClick={() => handleEditTask(task)}
					className="flex items-center justify-center gap-1.5 hover:underline"
				>
					<Pen size="14" /> EDITAR
				</button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] bottom-0 top-auto translate-y-0 sm:bottom-auto sm:top-[50%] sm:translate-y-[-50%]">
				<DialogHeader>
					<DialogTitle>Editando uma tarefa</DialogTitle>
					<DialogDescription>
						Informe um novo nome para a tarefa.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(() =>
							onSubmit(taskId, form.getValues()),
						)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="task"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarefa</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={form.formState.isSubmitting}>
								{form.formState.isSubmitting && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								Editar
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
