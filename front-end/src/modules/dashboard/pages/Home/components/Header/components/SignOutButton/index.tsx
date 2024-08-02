"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "./actions";

export function SignOutButton() {
	function handleSignOut() {
		signOut();
	}

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleSignOut}
			className="size-9 p-0"
		>
			<LogOut size={20} />
		</Button>
	);
}
