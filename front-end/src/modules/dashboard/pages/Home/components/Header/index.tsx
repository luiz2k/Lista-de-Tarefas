"use client";

import { Input } from "@/components/ui/input";
import { BookOpenCheck, Search } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { HomeContext } from "../../context";
import { SignOutButton } from "./components/SignOutButton";

export function Header() {
	const { search, handleSearch } = use(HomeContext);

	return (
		<header className="p-5 gap-2.5 border-b bg-primary flex items-center justify-between">
			<Link href="/" className="uppercase text-secondary">
				<BookOpenCheck size={35} />
			</Link>

			<div className="flex gap-2.5 items-center">
				<div className="relative">
					<div className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground">
						<Search size={"100%"} />
					</div>

					<Input
						type="search"
						placeholder="Busque tarefas..."
						value={search}
						onChange={(e) => handleSearch(e.target.value)}
						className="pl-8 pr-4 py-2 bg-secondary rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>

				<SignOutButton />
			</div>
		</header>
	);
}
