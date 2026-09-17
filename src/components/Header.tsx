import { Fragment } from "react";
import { Link } from "@tanstack/react-router";

const links = [
	{ to: "/about", label: "about" },
	{ to: "/projects", label: "projects" },
	{ to: "/contact", label: "contact" },
];

export default function Header() {
	return (
		<header className="sticky top-0 z-50 px-4">
			<nav className="page-wrap relative flex items-center justify-center py-4">
				<div className="flex flex-wrap items-center justify-center gap-x-5 text-md font-medium">
					{links.map((link, i) => (
						<Fragment key={link.to}>
							<Link
								to={link.to}
								className="nav-link"
								activeProps={{ className: "nav-link is-active" }}
							>
								{link.label}
							</Link>
							{i < links.length - 1 && (
								<span className="select-none opacity-60">·</span>
							)}
						</Fragment>
					))}
				</div>
			</nav>
		</header>
	);
}