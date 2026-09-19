import { useRouterState } from "@tanstack/react-router";

export default function RouteTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<div key={pathname} className="terminal-reveal">
			<div className="terminal-reveal-content">{children}</div>
			<span className="terminal-print-head" aria-hidden="true" />
		</div>
	);
}
