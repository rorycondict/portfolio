export type ProjectUpdate = {
	date: string;
	title: string;
	summary: string;
	learned: string;
	toolingChanges?: string[];
};

export type Project = {
	name: string;
	description: string;
	startedAt: string;
	endedAt?: string;
	link?: string;
	github?: string;
	tools: string[];
	languages: string[];
	updates: ProjectUpdate[];
};

export const PROJECTS: Project[] = [
	{
		name: "portfolio",
		description:
			"this site. built with the TanStack Start framework, hosted on Cloudflare Workers.",
		startedAt: "2026-08-02",
		link: "https://rorycondict.com",
		github: "https://github.com/rorycondict/portfolio",
		tools: ["TanStack Start", "React", "Tailwind CSS", "Cloudflare Workers"],
		languages: ["TypeScript", "JSX (React)"],
		updates: [
			{
				date: "2026-08-02",
				title: "initial release",
				summary:
					"basic React site, deployed on Cloudflare Workers via Wrangler CLI",
				learned: "TODO",
				toolingChanges: ["+ Cloudflare Workers", "+ Wrangler CLI"],
			},
			{
				date: "2026-09-14",
				title: "TanStack Start + SSR",
				summary:
					"migrated to TanStack Start with SSR, deployed to Cloudflare Workers.",
				learned: "SEO relies heavily on SSR, hence the move to TanStack Start.",
				toolingChanges: ["- npm", "+ Bun", "+ TanStack Start"],
			},
		],
	},
];
