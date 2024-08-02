"use client";

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
import { createTaskSchema } from "@/modules/shared/validations/taskValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../../actions";

import type { z } from "zod";

export function CreateTask() {
	const [open, setOpen] = useState<boolean>(false);

	const form = useForm<z.infer<typeof createTaskSchema>>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			task: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof createTaskSchema>) => {
		await createTask(data);

		setOpen(false);
	};

	return (
		<div className="flex justify-between items-center mb-2.5">
			<h2 className="text-xl">Tarefas</h2>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button onClick={() => setOpen(true)}>Nova Tarefa</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px] bottom-0 top-auto translate-y-0 sm:bottom-auto sm:top-[50%] sm:translate-y-[-50%]">
					<DialogHeader>
						<DialogTitle>Criando uma nova tarefa</DialogTitle>
						<DialogDescription>Informe o nome da tarefa.</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
									Criar
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
