import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: formatTitle("whoami") },
		],
	}),
	component: App,
});

function App() {
	return <main className="page-wrap px-4 pb-8 pt-14"></main>;
}
