import { Link } from "@tanstack/react-router";
import { PAGES } from "@/content/site";
import { formatTitle } from "@/utils";

export default function NotFound() {
	return (
		<>
			<title>{formatTitle("no such directory")}</title>
			<div className="flex flex-col items-start">
				<h1 className="text-3xl text-terminal-field pb-5">404: not found</h1>
				<p className="text-lg pb-10">
					we couldn't find the page you were looking for :(
				</p>
				<div className="flex flex-col gap-1">
					<Link
						to={PAGES.about.path}
						aria-label="return to homepage"
						className="text-lg text-terminal-accent underline decoration-terminal-accent/25 decoration-2 underline-offset-4 transition-colors duration-300 hover:text-fg-highlight hover:decoration-fg-highlight"
					>
						cd ~
					</Link>
					<p aria-hidden className="text-sm text-muted">
						(return to homepage)
					</p>
				</div>
			</div>
		</>
	);
}
