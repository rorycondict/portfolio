import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TbMenu2, TbX } from "react-icons/tb";
import { TERMINAL_PANE_ID } from "@/components/TerminalWindow";
import ThemeToggle from "@/components/ThemeToggle";
import { NAV_PAGES } from "@/content/site";
import { SOCIALS } from "@/content/socials";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
	return NAV_PAGES.map((page) => (
		<Link
			key={page.path}
			to={page.path}
			onClick={onNavigate}
			className="nav-link"
			activeProps={{ className: "nav-link is-active" }}
		>
			{page.label}
		</Link>
	));
}

function NavButtons({ iconSize = 20 }: { iconSize?: number }) {
	return (
		<>
			<a
				href={SOCIALS.github.href}
				aria-label={SOCIALS.github.label}
				title={SOCIALS.github.label}
				className="nav-link px-2 md:px-0"
			>
				<SOCIALS.github.icon size={iconSize} />
			</a>
			<ThemeToggle size={iconSize} />
		</>
	);
}

type MenuState = "closed" | "open" | "closing";

function MobileMenu() {
	const [state, setState] = useState<MenuState>("closed");
	const open = state === "open";
	// Stays mounted while closing so the hide animation can play
	const close = () => setState((s) => (s === "closed" ? s : "closing"));

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setState("closing");
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

	// Covers the terminal's content pane so the command line stays visible,
	// or the whole screen on pages without a terminal
	const pane =
		state === "closed" ? null : document.getElementById(TERMINAL_PANE_ID);
	const menu = state !== "closed" && (
		<div
			id="mobile-menu"
			className={`mobile-menu z-40 flex flex-col items-center justify-end gap-6 bg-bg px-4 md:hidden ${
				pane ? "absolute inset-0 pb-6" : "fixed inset-0 pb-24"
			} ${state === "closing" ? "is-closing" : ""}`}
			onAnimationEnd={(event) => {
				if (event.target === event.currentTarget && state === "closing") {
					setState("closed");
				}
			}}
		>
			<nav aria-label="main" className="flex flex-col items-center text-2xl">
				<NavLinks onNavigate={close} />
			</nav>
			<div className="flex items-center gap-4">
				<NavButtons iconSize={28} />
			</div>
		</div>
	);

	return (
		<div className="md:hidden">
			{menu && (pane ? createPortal(menu, pane) : menu)}

			<button
				type="button"
				onClick={() => (open ? close() : setState("open"))}
				aria-expanded={open}
				aria-controls="mobile-menu"
				className="nav-link relative z-50 w-full cursor-pointer justify-center gap-2"
			>
				{open ? <TbX size={20} /> : <TbMenu2 size={20} />}
				{open ? "close" : "menu"}
			</button>
		</div>
	);
}

export default function Header() {
	return (
		<header className="sticky top-0 z-50 px-4 pb-[env(safe-area-inset-bottom)] md:pb-0 order-last md:order-first text-lg">
			<nav
				aria-label="main"
				className="page-wrap relative hidden grid-cols-[1fr_auto] items-center gap-x-[2ch] py-4 md:grid"
			>
				<div className="grid grid-flow-col auto-cols-max gap-x-10">
					<NavLinks />
				</div>
				<div className="grid grid-flow-col auto-cols-max gap-x-5">
					<NavButtons />
				</div>
			</nav>

			<MobileMenu />
		</header>
	);
}
