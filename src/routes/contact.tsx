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
	return (
		<section className="flex flex-col gap-10 items-center">
			<div className="text-center max-w-md w-full mx-auto flex flex-col items-center">
				<h1 className="pb-3">
					you can reach me at{" "}
					<a href="mailto:hi@rorycondict.com">hi@rorycondict.com</a>
				</h1>
			</div>
		</section>
	);
}
