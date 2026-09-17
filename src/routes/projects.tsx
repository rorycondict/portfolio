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
			<p>see what I've been up to:</p>
		</section>
	);
}
