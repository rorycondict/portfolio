import { useMemo } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { Project, ProjectUpdate } from "../constants/projects";
import { formatMonthYear } from "../utils";

const TIMELINE_STEP = 300;
const LANE_GAP = 28;
const TRACK_PADDING = 28;

const RAIL_COLORS = [
	"var(--terminal-important)",
	"var(--terminal-accent)",
	"var(--terminal-field)",
	"#f9f1a5",
];

type TimelineEvent = {
	id: string;
	project: Project;
	update: ProjectUpdate;
	lane: number;
	isOngoingHeader?: boolean;
};

function buildTimelineEvents(projects: Project[]): TimelineEvent[] {
	const lanes = new Map(
		projects.map((project, index) => [project.name, index]),
	);

	const updates = projects
		.flatMap((project) =>
			project.updates.map((update) => ({
				id: `${project.name}-${update.date}-${update.title}`,
				project,
				update,
				lane: lanes.get(project.name) ?? 0,
			})),
		)
		.sort((a, b) => b.update.date.localeCompare(a.update.date));

	const ongoingHeaders = projects
		.filter((project) => project.ongoing)
		.map((project) => {
			const latestUpdate = [...project.updates].sort((a, b) =>
				b.date.localeCompare(a.date),
			)[0];
			return {
				id: `${project.name}-ongoing`,
				project,
				update: latestUpdate,
				lane: lanes.get(project.name) ?? 0,
				isOngoingHeader: true,
			};
		})
		.sort((a, b) => b.update.date.localeCompare(a.update.date));

	return [...ongoingHeaders, ...updates];
}

function ProjectOverview({ project }: { project: Project }) {
	return (
		<div>
			<div className="flex items-start justify-between gap-3">
				<h2 className="mt-1 text-lg text-fg-highlight">{project.name}</h2>

				<div className="flex gap-3 text-sm">
					{project.link && (
						<a href={project.link} aria-label={`Open ${project.name}`}>
							<FaExternalLinkAlt aria-hidden size={14} />
						</a>
					)}

					{project.github && (
						<a
							href={project.github}
							aria-label={`Open ${project.name} on GitHub`}
						>
							<FaGithub aria-hidden size={17} />
						</a>
					)}
				</div>
			</div>

			<p className="mt-3 text-sm leading-6">{project.description}</p>

			<div className="mt-4 space-y-2 text-xs">
				<div className="flex flex-wrap items-center gap-2">
					<span className="text-terminal-accent">tools:</span>
					{project.tools.map((item) => (
						<span key={item} className="border border-muted px-2 py-1">
							{item}
						</span>
					))}
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<span className="text-terminal-accent">languages:</span>
					{project.languages.map((item) => (
						<span key={item} className="border border-muted px-2 py-1">
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

function UpdateDetails({ update }: { update: ProjectUpdate }) {
	return (
		<div className="mt-5 border-t border-line pt-4 text-sm">
			<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
				<time className="text-xs text-muted" dateTime={update.date}>
					{formatMonthYear(update.date)}
				</time>
				<h3 className="text-fg-highlight">{update.title}</h3>
			</div>

			<p className="mt-2 leading-6">{update.summary}</p>

			<p className="mt-2 leading-6 text-muted">
				<span className="text-terminal-accent">learned: </span>
				{update.learned}
			</p>

			{update.toolingChanges && update.toolingChanges.length > 0 && (
				<ul className="mt-3 flex flex-wrap gap-2">
					{update.toolingChanges.map((change) => (
						<li
							key={change}
							className="border border-line px-2 py-1 text-xs text-muted"
						>
							{change}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default function ProjectTimeline({ projects }: { projects: Project[] }) {
	const events = useMemo(() => buildTimelineEvents(projects), [projects]);

	const projectRanges = useMemo(
		() =>
			projects.map((project, lane) => {
				const indices = events
					.map((event, index) =>
						event.project.name === project.name ? index : -1,
					)
					.filter((index) => index >= 0);
				return {
					lane,
					first: project.ongoing ? 0 : indices[0],
					last: indices.at(-1),
				};
			}),
		[events, projects],
	);

	const trackWidth = TRACK_PADDING * 2 + projects.length * LANE_GAP;

	return (
		<div
			className="git-project-timeline"
			style={
				{
					"--timeline-step": `${TIMELINE_STEP}px`,
					"--track-width": `${trackWidth}px`,
				} as React.CSSProperties
			}
		>
			<p className="mb-7 text-center text-xs text-muted">
				scroll down through project history
			</p>

			<div className="git-track" aria-hidden="true">
				{projectRanges.map(({ lane, first, last }) =>
					first === undefined || last === undefined ? null : (
						<div
							key={projects[lane]?.name}
							className="git-lane"
							style={
								{
									"--lane-left": `${TRACK_PADDING + lane * LANE_GAP}px`,
									"--lane-top": `${first * TIMELINE_STEP + 24}px`,
									"--lane-height": `${Math.max(2, (last - first) * TIMELINE_STEP)}px`,
									"--project-rail": RAIL_COLORS[lane % RAIL_COLORS.length],
								} as React.CSSProperties
							}
						/>
					),
				)}
			</div>

			<ol
				className="git-events"
				aria-label="Project update history, newest first"
			>
				{events.map((event, index) => {
					const isLatestProjectUpdate = !events
						.slice(0, index)
						.some(
							(earlierEvent) =>
								earlierEvent.project.name === event.project.name,
						);

					return (
						<li
							key={event.id}
							className="git-event"
							style={
								{
									"--lane-left": `${TRACK_PADDING + event.lane * LANE_GAP}px`,
									"--project-rail":
										RAIL_COLORS[event.lane % RAIL_COLORS.length],
								} as React.CSSProperties
							}
						>
							<span className="git-node" aria-hidden="true" />
							<span className="git-branch" aria-hidden="true" />

							<article
								className={`git-card ${isLatestProjectUpdate ? "git-card-primary" : "git-card-secondary"}`}
							>
								{isLatestProjectUpdate && (
									<ProjectOverview project={event.project} />
								)}

								<div
									className={isLatestProjectUpdate ? "" : "git-update-compact"}
								>
									{!isLatestProjectUpdate && (
										<div>
											<p className="text-xs">{event.project.name}</p>
											<UpdateDetails update={event.update} />
										</div>
									)}
								</div>
							</article>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
