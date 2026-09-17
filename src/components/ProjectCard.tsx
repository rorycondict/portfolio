import type { Project } from "../constants/projects";

export default function ProjectCard({ project }: { project: Project }) {
	const { name, description, link, tools, languages } = project;

	return (
		<article className="flex flex-col gap-2 border border-line p-5">
			<div className="flex items-baseline justify-between gap-4">
				<h2 className="text-lg">
					{link ? <a href={link}>{name}</a> : <span>{name}</span>}
				</h2>
			</div>

			<p className="text-sm">{description}</p>

			<ul className="flex flex-wrap gap-2 pt-1">
				{tools.map((t) => (
					<li
						key={t}
						className="text-muted text-xs border border-line rounded px-2 py-0.5"
					>
						{t}
					</li>
				))}
			</ul>

			<ul className="flex flex-wrap gap-2 pt-1">
				{languages.map((t) => (
					<li
						key={t}
						className="text-muted text-xs border border-line rounded px-2 py-0.5"
					>
						{t}
					</li>
				))}
			</ul>
		</article>
	);
}
