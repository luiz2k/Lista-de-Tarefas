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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../shared/validations/authValidation";
import { login } from "./actions";

import type { z } from "zod";
import type { Messagens, Status } from "./types";

// Página de login de usuário
export function SignInPage() {
	const router = useRouter();

	// Verifica o status apartir do parâmetro da URL
	const searchParams = useSearchParams();
	const params = searchParams.get("status") as "created" | "expired";

	// Feedbacks possíveis para ser exibido
	const statusMessages: Messagens = {
		default: {
			message: "Digite seu email e senha para entrar",
			color: "",
		},
		created: {
			message: "Sua conta foi criada com sucesso",
			color: "text-green-500",
		},
		expired: {
			message: "Sua sessão expirou",
			color: "text-red-500",
		},
	};

	// Cria o estado de acordo com o parâmetro da URL
	const stateValue = statusMessages[params] || statusMessages.default;

	// State responsável pelo feedback de erro/sucesso
	const [status, setStatus] = useState<Status>(stateValue);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		try {
			const response = await login(data);

			if (response?.error) {
				throw new Error(response.message);
			}

			router.push("/");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Ocorreu um erro inesperado.";

			// Define o status de acordo com a resposta do back-end
			setStatus({ message: errorMessage, color: "text-red-500" });
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen">
			<div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg">
				<div className="text-center">
					<h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
					<p className={`${status.color}`}>{status.message}</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full"
						>
							{form.formState.isSubmitting && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Entrar
						</Button>
					</form>
				</Form>

				<div className="text-center text-muted-foreground">
					Você não tem uma conta?{" "}
					<Link
						href="/registro"
						className="font-medium underline"
						prefetch={false}
					>
						Registro
					</Link>
				</div>
			</div>
		</main>
	);
}
