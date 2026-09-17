import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [{ title: formatTitle("ls projects/") }],
	}),
	component: Projects,
});

function Projects() {
	return (
		<section>
			<h1 className="text-center max-w-md w-full mx-auto">
				these are projects that I've created, contributed to, or am currently
				maintaining.
			</h1>
		</section>
	);
}
