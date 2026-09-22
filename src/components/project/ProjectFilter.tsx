export type ProjectFilterProps = {
	query: string;
	onQueryChange: (query: string) => void;
};

export default function ProjectFilter({
	query,
	onQueryChange,
}: ProjectFilterProps) {
	return (
		<div className="flex flex-wrap items-baseline gap-2 text-sm">
			<label htmlFor="project-filter" className="cursor-text select-none">
				<span className="text-terminal-accent">~</span>$ grep -i
			</label>

			<input
				id="project-filter"
				type="text"
				value={query}
				onChange={(event) => onQueryChange(event.target.value)}
				onKeyDown={(event) => {
					if (event.key === "Escape") onQueryChange("");
				}}
				placeholder="_"
				autoComplete="off"
				spellCheck={false}
				maxLength={50}
				className="field-sizing-content max-w-full min-w-[12ch] bg-transparent p-1 caret-fg-highlight outline-0 outline-muted outline-dashed placeholder-shown:outline-1 placeholder:text-muted"
			/>

			{query && (
				<button
					type="button"
					onClick={() => onQueryChange("")}
					className="text-muted text-xs transition-colors hover:text-fg-highlight"
				>
					[esc]
				</button>
			)}

			<span className="text-muted"># search for keywords</span>
		</div>
	);
}
