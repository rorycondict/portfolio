import { Link } from "@tanstack/react-router";
import { Fragment } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV_PAGES } from "@/content/site";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 px-4 order-last md:order-first">
			<nav className="page-wrap relative flex items-center justify-between gap-x-5 py-4">
				<div className="flex flex-wrap items-center gap-x-5 text-lg">
					{NAV_PAGES.map((page, index) => (
						<Fragment key={page.path}>
							{index > 0 && <span className="select-none opacity-60">·</span>}
							<Link
								to={page.path}
								className="nav-link"
								activeProps={{ className: "nav-link is-active" }}
							>
								{page.label}
							</Link>
						</Fragment>
					))}
				</div>
				<div className="flex items-center gap-x-3">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
