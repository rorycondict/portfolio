import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: formatTitle("ping rory") },
			{
				name: "description",
				content:
					"here you can reach out to me with a question, offer, or just to have a quick chat.",
			},
		],
	}),
	component: Contact,
});

function Contact() {
	return <div>wip :(</div>;
}
