import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import IconLink from "@/components/common/IconLink";
import Separator from "@/components/common/Separator";
import ProjectBrowser from "@/components/project/ProjectBrowser";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/projects")({
	head: () => ({
		meta: [
			{ title: formatTitle("ls projects/") },
			{
				name: "description",
				content:
					"browse the projects I've created, contributed to, or am currently maintaining.",
			},
		],
	}),
	component: Projects,
});

function Projects() {
	return (
		<section className="flex flex-col gap-10 items-center">
			<div className="text-center max-w-md w-full mx-auto flex flex-col items-center">
				<h1 className="pb-3">
					these are projects that I've created, contributed to, or am currently
					maintaining.
				</h1>

				<IconLink
					href="https://github.com/rorycondict"
					icon={<FaGithub size={20} />}
				>
					GitHub
				</IconLink>

				<Separator />
			</div>

			<ProjectBrowser
				footer={
					<p className="mt-4 self-center text-[10px] text-muted">
						oh, that's everything? :(
					</p>
				}
			/>
		</section>
	);
}
