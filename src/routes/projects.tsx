import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import IconLink from "@/components/IconLink";
import { formatTitle } from "@/utils";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "../constants/projects";

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

				{"-".repeat(20)}
			</div>

			<ul className="flex flex-col gap-5 max-w-xl mx-auto w-full">
				{PROJECTS.map((project) => (
					<li key={project.name}>
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}
