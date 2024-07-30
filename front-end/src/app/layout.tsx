import { Roboto } from "next/font/google";
import "@/styles/globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${roboto.className} bg-neutral-100`}>{children}</body>
		</html>
	);
}
