import type { ProjectMedia } from "@/constants/projects";

export default function ProjectPreview({ media }: { media: ProjectMedia[] }) {
	return (
		<details className="group">
			<summary className="w-fit cursor-pointer list-none text-xs [&::-webkit-details-marker]:hidden">
				<span className="text-terminal-important">
					<span className="group-open:hidden">[+]</span>
					<span className="hidden group-open:inline">[-]</span>
				</span>{" "}
				<span className="transition-colors group-hover:text-fg-highlight">
					preview ({media.length})
				</span>
			</summary>

			<ul className="grid gap-2 pt-3 sm:grid-cols-2">
				{media.map((item) => (
					<li key={item.src} className="border border-muted/60">
						<img
							src={item.src}
							alt={item.alt}
							loading="lazy"
							decoding="async"
							className="w-full object-cover"
						/>
					</li>
				))}
			</ul>
		</details>
	);
}
