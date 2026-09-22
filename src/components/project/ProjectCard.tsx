import type { ReactNode } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import IconLink from "@/components/common/IconLink";
import type { Project } from "@/constants/projects";
import { formatMonthYear, isExternalUrl } from "@/utils";

type MetaRowProps = { label: string; values: string[] };
type CardLink = { label: string; href: string; icon: ReactNode };

function MetaRow({ label, values }: MetaRowProps) {
	return (
		<>
			<dt className="text-terminal-important">{label}:</dt>
			<dd>
				<ul className="flex flex-wrap gap-1.5">
					{values.map((value) => (
						<li key={value} className="border border-muted/60 px-2 py-0.5">
							{value}
						</li>
					))}
				</ul>
			</dd>
		</>
	);
}

export default function ProjectCard({ project }: { project: Project }) {
	const { name, description, date, link, source, tools, languages } = project;

	// add a row here to list a new tag-like field on every card
	const rows: MetaRowProps[] = [
		{ label: "tools", values: tools },
		{ label: "langs", values: languages },
	].filter((row) => row.values.length > 0);

	const links: CardLink[] = [];
	if (isExternalUrl(link)) {
		links.push({
			label: "live",
			href: link,
			icon: <FaExternalLinkAlt size={12} />,
		});
	}
	if (isExternalUrl(source)) {
		links.push({ label: "source", href: source, icon: <FaGithub size={14} /> });
	}

	return (
		<article className="border border-muted/60 transition-colors hover:border-fg">
			<header className="flex items-baseline justify-between gap-4 border-b border-muted/60 px-4 py-2">
				<h3 className="text-terminal-accent">
					{name}
					<span className="text-muted">/</span>
				</h3>
				<time dateTime={date} className="shrink-0 text-muted text-sm">
					{formatMonthYear(date)}
				</time>
			</header>

			<div className="flex flex-col gap-3 px-4 py-3 text-sm">
				<p>{description}</p>

				{rows.length > 0 && (
					<dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1.5 text-xs">
						{rows.map((row) => (
							<MetaRow key={row.label} label={row.label} values={row.values} />
						))}
					</dl>
				)}

				{links.length > 0 && (
					<ul className="flex flex-wrap gap-x-5 gap-y-1 pt-1 text-xs">
						{links.map(({ label, href, icon }) => (
							<li key={label}>
								<IconLink
									href={href}
									icon={icon}
									className="items-center gap-1.5"
								>
									{label}
								</IconLink>
							</li>
						))}
					</ul>
				)}
			</div>
		</article>
	);
}
