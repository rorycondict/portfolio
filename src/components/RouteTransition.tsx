import { useRouterState } from "@tanstack/react-router";

export default function RouteTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<div
			key={pathname}
			className="terminal-reveal flex flex-col p-8 content-box flex-1 min-h-0 overflow-y-auto mx-auto w-full max-w-6xl my-5 border-2"
		>
			<div className="terminal-reveal-content flex-1">{children}</div>
			<span className="terminal-print-head" aria-hidden="true" />
		</div>
	);
}
