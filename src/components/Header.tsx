import { Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { NAV_PAGES } from "@/content/site";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 px-4 order-last md:order-first">
			<nav className="page-wrap relative flex items-center justify-center py-4">
				<div className="flex flex-wrap items-center justify-center gap-x-5 text-lg">
					{NAV_PAGES.map((page, i) => (
						<Fragment key={page.path}>
							<Link
								to={page.path}
								className="nav-link"
								activeProps={{ className: "nav-link is-active" }}
							>
								{page.label}
							</Link>
							{i < NAV_PAGES.length - 1 && (
								<span className="select-none opacity-60">·</span>
							)}
						</Fragment>
					))}
				</div>
			</nav>
		</header>
	);
}
