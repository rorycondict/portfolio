import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: [{ title: formatTitle("whoami") }],
	}),
	component: About,
});

function About() {
	return <div>About Page</div>;
}
