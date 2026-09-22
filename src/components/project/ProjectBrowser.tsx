import { type ReactNode, useState } from "react";
import { PROJECTS, type Project } from "@/constants/projects";
import ProjectFilter from "./ProjectFilter";
import ProjectTimeline from "./ProjectTimeline";

function normalize(value: string) {
	return value.toLowerCase().replace(/[\s_]+/g, " ");
}

function haystack(project: Project) {
	const fields = [
		project.name,
		project.description,
		project.role ?? "",
		...project.tools,
		...project.languages,
		...(project.metrics ?? []),
	];

	return normalize(fields.join(" "));
}

export default function ProjectBrowser({
	projects = PROJECTS,
	footer,
}: {
	projects?: Project[];
	footer?: ReactNode;
}) {
	const [query, setQuery] = useState("");

	const term = normalize(query).trim();
	const matches = term
		? projects.filter((project) => haystack(project).includes(term))
		: projects;

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
			<ProjectFilter query={query} onQueryChange={setQuery} />

			{term.length > 0 && (
				<p className="text-xs">
					{matches.length > 0 ? (
						<span className="text-muted">
							# {matches.length} match{matches.length === 1 ? "" : "es"}
						</span>
					) : (
						<span className="text-terminal-field">
							grep: no matches for "{query.trim()}" (exit 1)
						</span>
					)}
				</p>
			)}

			<ProjectTimeline projects={matches} onSelectTag={setQuery} />

			{term.length === 0 && footer}
		</div>
	);
}
