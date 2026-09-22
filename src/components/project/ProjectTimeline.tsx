import { PROJECTS, type Project } from "@/constants/projects";
import ProjectCard from "./ProjectCard";

type ProjectSection = {
	label: string;
	projects: Project[];
	accent?: boolean;
};

export type ProjectTimelineProps = {
	projects?: Project[];
	onSelectTag?: (value: string) => void;
};

function byNewest(a: Project, b: Project) {
	return b.date.localeCompare(a.date);
}

function groupByYear(projects: Project[]): ProjectSection[] {
	const years = new Map<string, Project[]>();

	for (const project of projects) {
		const year = project.date.slice(0, 4);
		const entries = years.get(year);
		if (entries) entries.push(project);
		else years.set(year, [project]);
	}

	return [...years].map(([label, entries]) => ({ label, projects: entries }));
}

// sections render in order — add one here to surface another grouping
function buildSections(projects: Project[]): ProjectSection[] {
	const sorted = [...projects].sort(byNewest);
	const pinned = sorted.filter((project) => project.featured);
	const rest = sorted.filter((project) => !project.featured);

	return [
		...(pinned.length > 0
			? [{ label: "pinned", projects: pinned, accent: true }]
			: []),
		...groupByYear(rest),
	];
}

export default function ProjectTimeline({
	projects = PROJECTS,
	onSelectTag,
}: ProjectTimelineProps) {
	return (
		<div className="flex w-full flex-col gap-8">
			{buildSections(projects).map((section) => (
				<section key={section.label} className="flex flex-col gap-4">
					<h2
						className={`flex items-center gap-3 text-lg ${
							section.accent ? "text-terminal-important" : ""
						}`}
					>
						{section.label}
						<span aria-hidden="true" className="h-px flex-1 bg-muted/40" />
					</h2>

					<ul className="flex flex-col gap-4">
						{section.projects.map((project) => (
							<li key={`${project.name}-${project.date}`}>
								<ProjectCard project={project} onSelectTag={onSelectTag} />
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	);
}
