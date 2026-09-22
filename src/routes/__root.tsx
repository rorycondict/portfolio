import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { formatTitle } from "@/utils";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RouteTransition from "../components/RouteTransition";
import TerminalCommand from "../components/TerminalCommand";
import { FULL_CHROME, type RouteChrome } from "../constants/chrome";
import { SITE } from "../constants/site";
import { normalizeRoutePath, ROUTE_COMMANDS } from "../constants/terminal";
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
				title: SITE.title,
			},
			{ name: "description", content: SITE.description },

			{ property: "og:title", content: SITE.title },
			{
				property: "og:description",
				content: SITE.description,
			},
			{
				property: "og:url",
				content: SITE.url,
			},
			{ property: "og:image", content: SITE.image },
			{ property: "og:type", content: "website" },

			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE.title },
			{ name: "twitter:description", content: SITE.description },
			{ name: "twitter:url", content: SITE.url },
			{ name: "twitter:image", content: SITE.image },
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.webp",
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
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const chrome = useRouteChrome();
	const route = normalizeRoutePath(pathname);
	const commands = ROUTE_COMMANDS[route];
	const target = route.replace(/^\//, "");
	const hasChrome = chrome.header || chrome.terminal || chrome.footer;

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
				className={
					hasChrome
						? "app-shell flex flex-col overflow-hidden w-full mx-auto py-5 font-sans antialiased wrap-anywhere"
						: "w-full mx-auto font-sans antialiased wrap-anywhere"
				}
			>
				{chrome.header && <Header />}
				{chrome.terminal && (
					<div className="mx-auto w-full max-w-6xl mt-5">
						<TerminalCommand
							commands={commands ?? [`cd ~/${target}`]}
							error={
								commands
									? undefined
									: `-bash: cd: ${target}: No such file or directory`
							}
							trigger={route}
						/>
					</div>
				)}
				{chrome.transition ? (
					<RouteTransition>{content}</RouteTransition>
				) : (
					content
				)}
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
