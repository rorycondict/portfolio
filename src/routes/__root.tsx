import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TerminalWindow from "@/components/TerminalWindow";
import { FULL_CHROME, type RouteChrome } from "@/content/chrome";
import { SITE } from "@/content/site";
import appCss from "@/styles.css?url";
import { formatTitle } from "@/utils";

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
			{ name: "description", content: SITE.description },

			{ property: "og:site_name", content: SITE.name },
			{ property: "og:title", content: SITE.name },
			{ property: "og:description", content: SITE.description },
			{ property: "og:image", content: SITE.image },
			{ property: "og:type", content: "website" },

			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE.name },
			{ name: "twitter:description", content: SITE.description },
			{ name: "twitter:image", content: SITE.image },
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png",
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function useRouteChrome(): RouteChrome {
	const overrides = useRouterState({
		select: (s): Partial<RouteChrome>[] =>
			s.matches.map((m) => m.staticData?.chrome ?? {}),
	});

	return { ...FULL_CHROME, ...Object.assign({}, ...overrides) };
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const chrome = useRouteChrome();

	const content = (
		<main className="w-full">
			{children}
			{chrome.footer && <Footer />}
		</main>
	);

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script src="/theme-init.js" suppressHydrationWarning />
				<HeadContent />
			</head>
			<body
				className={`w-full mx-auto antialiased wrap-anywhere ${
					chrome.terminal ? "flex h-dvh flex-col overflow-hidden py-5" : ""
				}`}
			>
				{chrome.header && <Header />}
				{chrome.terminal ? <TerminalWindow>{content}</TerminalWindow> : content}
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
			<title>{formatTitle("no such directory")}</title>
			<div className="flex flex-col gap-3 text-center">
				<h1 className="text-3xl text-terminal-field pb-10">404: not found</h1>
				<p className="text-lg">
					we couldn't find the page you were looking for :(
				</p>
				<Link
					to="/about"
					className="text-terminal-accent underline underline-offset-4"
				>
					return to home
				</Link>
			</div>
		</>
	);
}
