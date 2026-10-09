import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { NO_CHROME } from "@/content/chrome";
import { PAGES, pageHead, SITE } from "@/content/site";

export const Route = createFileRoute("/")({
	head: () => pageHead(PAGES.home),
	staticData: { chrome: NO_CHROME },
	component: App,
});

function Logo() {
	return (
		<div className="ascii-fit flex w-full justify-center">
			<pre className="pl-10 ascii-art splash-logo" role="img" aria-label="rc.">
				{`░██░████  ░███████
░███     ░██    ░██
░██      ░██
░██      ░██    ░██
░██       ░███████  `}
				<span className="text-terminal-field">░██</span>
			</pre>
		</div>
	);
}

function App() {
	const navigate = useNavigate();
	const [program, ...rest] = PAGES.home.command.split(" ");
	const args = rest.join(" ");

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Enter" || event.target !== document.body) return;
			navigate({ to: PAGES.about.path });
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [navigate]);

	return (
		<section className="flex min-h-dvh flex-col items-center justify-center gap-20 px-4">
			<h1 className="sr-only">{SITE.name}</h1>
			<Logo />
			<div className="flex flex-col items-center gap-2">
				<Link
					to={PAGES.about.path}
					aria-label="enter site"
					className="splash-enter text-2xl no-underline md:text-xl"
				>
					<span aria-hidden>
						<span className="text-terminal-command">{program}</span> {args}
						<span className="terminal-caret" />
					</span>
				</Link>
				<p aria-hidden className="text-sm md:text-xs text-muted">
					(enter the site)
				</p>
			</div>
		</section>
	);
}
