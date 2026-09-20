import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		throw redirect({
			// TODO: remove once landing page is complete
			to: "/about",
			statusCode: 307,
		});
	},
	head: () => ({
		meta: [],
	}),
	component: App,
});

function App() {
	return (
		<section>
			<p>loading...</p>
		</section>
	);
}
