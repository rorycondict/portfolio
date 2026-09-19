import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { formatTitle } from "@/utils";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RouteTransition from "../components/RouteTransition";
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
			<body className="flex h-screen flex-col overflow-hidden w-full mx-auto py-25 font-sans antialiased wrap-anywhere">
				<Header />
				<div className="p-8 content-box flex-1 min-h-0 overflow-y-auto mx-auto w-full max-w-6xl my-5 border-2">
					<main className="w-full">
						<RouteTransition>{children}</RouteTransition>
					</main>
					<Footer />
				</div>
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
