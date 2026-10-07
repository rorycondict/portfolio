import { useRouterState } from "@tanstack/react-router";
import RouteTransition from "@/components/RouteTransition";
import TerminalCommand from "@/components/TerminalCommand";
import { findPage } from "@/content/site";
import { normalizePath } from "@/utils";

export default function TerminalWindow({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const route = normalizePath(pathname);
	const page = findPage(route);
	const target = route.replace(/^\//, "");

	return (
		<div className="mx-auto mt-5 flex min-h-0 w-full max-w-4xl flex-1 flex-col">
			<TerminalCommand
				commands={[page?.command ?? `cd ~/${target}`]}
				error={
					page ? undefined : `-bash: cd: ${target}: No such file or directory`
				}
				trigger={route}
			/>
			<RouteTransition>{children}</RouteTransition>
		</div>
	);
}
