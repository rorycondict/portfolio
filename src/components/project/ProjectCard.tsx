import type { ReactNode } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import IconLink from "@/components/common/IconLink";
import type { Project } from "@/constants/projects";
import { formatDateRange, isExternalUrl } from "@/utils";
import ProjectPreview from "./ProjectPreview";

type MetaRowProps = {
	label: string;
	values: string[];
	onSelect?: (value: string) => void;
};

type CardLink = { label: string; href: string; icon: ReactNode };

function MetaRow({ label, values, onSelect }: MetaRowProps) {
	return (
		<>
			<dt className="text-terminal-important">{label}:</dt>
			<dd>
				<ul className="flex flex-wrap gap-1.5">
					{values.map((value) =>
						onSelect ? (
							<li key={value}>
								<button
									type="button"
									onClick={() => onSelect(value)}
									title={`grep -i ${value}`}
									className="cursor-pointer border border-muted/60 px-2 py-0.5 transition-colors hover:border-fg hover:text-fg-highlight"
								>
									{value}
								</button>
							</li>
						) : (
							<li key={value} className="border border-muted/60 px-2 py-0.5">
								{value}
							</li>
						),
					)}
				</ul>
			</dd>
		</>
	);
}

function Metrics({ values }: { values: string[] }) {
	return (
		<ul className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-terminal-important">
			{values.map((value, index) => (
				<li key={value} className="flex items-baseline gap-2">
					{index > 0 && (
						<span aria-hidden="true" className="text-muted">
							·
						</span>
					)}
					{value}
				</li>
			))}
		</ul>
	);
}

export default function ProjectCard({
	project,
	onSelectTag,
}: {
	project: Project;
	onSelectTag?: (value: string) => void;
}) {
	const {
		name,
		description,
		date,
		endedAt,
		role,
		link,
		source,
		tools,
		languages,
		metrics = [],
		featured,
		media = [],
	} = project;

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

	const edge = featured ? "border-fg/50" : "border-muted/60";

	return (
		<article className={`border ${edge} transition-colors hover:border-fg`}>
			<header className={`flex flex-col gap-1 border-b ${edge} px-4 py-2`}>
				<div className="flex items-baseline justify-between gap-4">
					<h3 className="text-terminal-accent">
						{featured && (
							<span aria-hidden="true" className="text-terminal-important">
								*
							</span>
						)}
						{name}
						<span className="text-muted">/</span>
					</h3>

					<span className="shrink-0 text-muted text-sm">
						{formatDateRange(date, endedAt)}
					</span>
				</div>

				{role && <p className="text-muted text-xs">{role}</p>}
			</header>

			<div className="flex flex-col gap-3 px-4 py-3 text-sm">
				{metrics.length > 0 && <Metrics values={metrics} />}

				<p>{description}</p>

				{rows.length > 0 && (
					<dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1.5 text-xs">
						{rows.map((row) => (
							<MetaRow
								key={row.label}
								label={row.label}
								values={row.values}
								onSelect={onSelectTag}
							/>
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

				{media.length > 0 && <ProjectPreview media={media} />}
			</div>
		</article>
	);
}
