import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { formatTitle } from "@/utils";
import Footer from "../components/Footer";
import Header from "../components/Header";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "rory:~$ whoami",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.png",
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script src="/theme-init.js" suppressHydrationWarning />
				<HeadContent />
			</head>
			<body className="flex h-screen flex-col overflow-hidden w-full max-w-4xl mx-auto py-30 font-sans antialiased wrap-anywhere px-8">
				<Header />
				<main className="min-h-0 flex-1 overflow-y-auto mx-auto w-full max-w-2xl my-5">
					{children}
				</main>
				<Footer />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<>
			<title>{formatTitle("command not found")}</title>
			<div className="flex flex-col gap-10 text-center">
				<p>we couldn't find the page you were looking for :(</p>
			</div>
		</>
	);
}
