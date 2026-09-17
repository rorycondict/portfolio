import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: "ssh rory@portfolio" }],
	}),
	component: App,
});

function App() {
	return (
		<section>
			<p>welcome</p>
		</section>
	);
}
