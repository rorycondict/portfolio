import { createFileRoute } from "@tanstack/react-router";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: [{ title: formatTitle("ping rory") }],
	}),
	component: Contact,
});

function Contact() {
	return <div>Contact Page</div>;
}
