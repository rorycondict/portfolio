import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [{ title: formatTitle("cd projects") }],
	}),
	component: Projects,
});

function Projects() {
	return <main className="page-wrap px-4 py-12">About Page</main>;
}
