import { Link } from "@tanstack/react-router";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV_PAGES } from "@/content/site";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 px-4 order-last md:order-first text-lg">
			<nav className="page-wrap relative grid grid-flow-col items-center justify-between gap-x-[2ch] py-1 md:grid-flow-row md:grid-cols-[1fr_auto] md:py-4">
				<div className="contents md:grid md:grid-flow-col md:auto-cols-max md:gap-x-[3ch]">
					{NAV_PAGES.map((page) => (
						<Link
							key={page.path}
							to={page.path}
							className="nav-link"
							activeProps={{ className: "nav-link is-active" }}
						>
							{page.label}
						</Link>
					))}
				</div>
				<div className="contents md:grid md:grid-flow-col md:auto-cols-max md:gap-x-3">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
