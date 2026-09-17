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
		meta: [
			{ title: "ssh rory@portfolio" },
			{
				name: "description",
				content:
					"welcome to my portfolio. here you can learn about my interests, as well as what I've been working on recently.",
			},
		],
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
