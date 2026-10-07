import { createFileRoute, redirect } from "@tanstack/react-router";
import { PAGES, pageHead } from "@/content/site";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		throw redirect({
			// TODO: remove once landing page is complete
			to: "/about",
			statusCode: 307,
		});
	},
	head: () => pageHead(PAGES.home),
	component: App,
});

function App() {
	return (
		<section>
			<p>loading...</p>
		</section>
	);
}
