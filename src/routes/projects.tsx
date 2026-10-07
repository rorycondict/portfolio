import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import IconLink from "@/components/common/IconLink";
import ProjectBrowser from "@/components/project/ProjectBrowser";
import { PAGES, pageHead } from "@/content/site";

export const Route = createFileRoute("/projects")({
	head: () => pageHead(PAGES.projects),
	component: Projects,
});

function Projects() {
	return (
		<section className="flex flex-col gap-10 items-start">
			<div className="max-w-md w-full flex flex-col items-start">
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
			</div>

			<ProjectBrowser
				footer={
					<p className="mt-4 self-start text-[10px] text-muted">
						oh, that's everything? :(
					</p>
				}
			/>
		</section>
	);
}
