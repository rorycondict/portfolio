import { createFileRoute } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import IconLink from "@/components/IconLink";
import { formatMonthYear, formatTitle } from "@/utils";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "../constants/projects";

const sortedProjects = [...PROJECTS].sort((a, b) =>
	b.startedAt.localeCompare(a.startedAt),
);

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

			<ul className="relative flex flex-col gap-8 max-w-xl mx-auto w-full">
				<div
					aria-hidden
					className="absolute top-3 bottom-3 left-1.75 w-px bg-line"
				/>

				{sortedProjects.map((project) => (
					<li key={project.name} className="relative pl-8">
						<p className="text-muted text-xs pb-2">
							{formatMonthYear(project.startedAt)}
						</p>
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}
