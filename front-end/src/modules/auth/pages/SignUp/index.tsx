"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQueryString } from "@/modules/shared/utils/createQueryString";
import { createUserSchema } from "@/modules/shared/validations/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "./actions";

import type { z } from "zod";

export function SignUpPage() {
	const router = useRouter();

	// State responsável pelo feedback de erro/sucesso
	const [message, setMessage] = useState({
		message: "Preencha os dados abaixo para criar sua conta",
		color: "",
	});

	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof createUserSchema>) => {
		try {
			await createUser(data);

			const query = createQueryString("status", "created");

			router.push(`/entrar?${query}`);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Ocorreu um erro inesperado.";

			// Define o status de acordo com a resposta do back-end
			setMessage({ message: errorMessage, color: "text-red-500" });
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen">
			<div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg">
				<div className="text-center">
					<h1 className="text-3xl font-bold">Crie sua conta</h1>
					<p className={`text-muted-foreground ${message.color}`}>
						{message.message}
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome de usuário</FormLabel>
									<FormControl>
										<Input placeholder="James Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="@" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirme sua senha</FormLabel>
									<FormControl>
										<Input placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full"
						>
							{form.formState.isSubmitting && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Criar conta
						</Button>
					</form>
				</Form>

				<div className="text-center text-muted-foreground">
					Você ja tem uma conta?{" "}
					<Link
						href="/entrar"
						className="font-medium underline"
						prefetch={false}
					>
						Entrar
					</Link>
				</div>
			</div>
		</main>
	);
}
