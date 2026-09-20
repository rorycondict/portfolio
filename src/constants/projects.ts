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
	ongoing?: boolean;
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
		tools: ["TanStack Start", "Cloudflare Workers"],
		languages: ["TypeScript", "JSX (React)", "CSS"],
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
	{
		name: "pearlcat",
		description:
			"a mod for a game called 'rain world'. my first big project, something around 35k lines of code.",
		startedAt: "2023-08-10",
		ongoing: true,
		link: "TODO",
		github: "https://github.com/rorycondict/pearlcat",
		tools: ["Unity Engine", "MonoMod", "dnSpy"],
		languages: ["C#", "HLSL", "Python"],
		updates: [
			{
				date: "2023-08-10",
				title: "1.1",
				summary: "TODO",
				learned: "TODO",
				toolingChanges: ["TODO"],
			},
			{
				date: "2023-08-10",
				title: "initial release",
				summary: "TODO",
				learned: "TODO",
				toolingChanges: ["TODO"],
			},
		],
	},
	{
		name: "evp website",
		description: "website for Edinburgh VenturePoint.",
		startedAt: "2026-05-05",
		link: "TODO",
		github: "https://github.com/rorycondict/pearlcat",
		tools: ["React", "FastAPI", "Vite"],
		languages: ["TypeScript", "JSX (React)", "CSS", "Python"],
		updates: [
			{
				date: "2026-05-05",
				title: "initial release",
				summary: "TODO",
				learned: "TODO",
				toolingChanges: ["TODO"],
			},
			{
				date: "2026-09-10",
				title: "version 2",
				summary: "TODO",
				learned: "TODO",
				toolingChanges: ["TODO"],
			},
		],
	},
];
