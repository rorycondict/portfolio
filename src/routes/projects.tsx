import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [{ title: formatTitle("ls projects/") }],
	}),
	component: Projects,
});

function Projects() {
	return <div>Projects Page {'a'.repeat(10000)}</div>;
}
