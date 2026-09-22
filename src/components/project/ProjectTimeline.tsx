import { PROJECTS, type Project } from "@/constants/projects";
import ProjectCard from "./ProjectCard";

function groupByYear(projects: Project[]) {
	const years = new Map<string, Project[]>();

	for (const project of projects) {
		const year = project.date.slice(0, 4);
		const entries = years.get(year);
		if (entries) entries.push(project);
		else years.set(year, [project]);
	}

	return [...years];
}

export default function ProjectTimeline({
	projects = PROJECTS,
}: {
	projects?: Project[];
}) {
	const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
			{groupByYear(sorted).map(([year, entries]) => (
				<section key={year} className="flex flex-col gap-4">
					<h2 className="flex items-center gap-3 text-md">
						{year}
						<span aria-hidden="true" className="h-px flex-1 bg-muted/40" />
					</h2>

					<ul className="flex flex-col gap-4">
						{entries.map((project) => (
							<li key={`${project.name}-${project.date}`}>
								<ProjectCard project={project} />
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
}
