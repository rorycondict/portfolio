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
	date: string;
	link?: string;
	source?: string;
	tools: string[];
	languages: string[];
};

export const PROJECTS: Project[] = [
	{
		name: "portfolio_website",
		description:
			"this site. built with the TanStack Start framework, hosted on Cloudflare Workers.",
		date: "2026-08-02",
		link: "https://rorycondict.com",
		source: "https://github.com/rorycondict/portfolio",
		tools: ["TanStack Start", "Cloudflare Workers", "Wrangler CLI", "Biome"],
		languages: ["TypeScript", "JSX (React)", "CSS"],
	},
	{
		name: "evp_website",
		description: "website for Edinburgh VenturePoint.",
		date: "2026-05-05",
		link: "https://edinburghventurepoint.com",
		source: "https://github.com/rorycondict/evp-website",
		tools: ["React", "FastAPI", "Vite", "Bun"],
		languages: ["TypeScript", "JSX (React)", "CSS", "Python"],
	},
	{
		name: "pearlcat",
		description: "a mod for a game called 'rain world'.",
		date: "2023-08-10",
		link: "TODO",
		source: "https://github.com/rorycondict/pearlcat",
		tools: ["Unity Engine", "MonoMod", "dnSpy"],
		languages: ["C#", "HLSL", "Python"],
	},
];
