export type ProjectMedia = {
	src: string;
	alt: string;
};

export type Project = {
	name: string;
	description: string;
	date: string;
	endedAt?: string;
	role?: string;
	link?: string;
	source?: string;
	tools: string[];
	languages: string[];
	metrics?: string[];
	featured?: boolean;
	media?: ProjectMedia[];
};

export const PROJECTS: Project[] = [
	{
		name: "portfolio_website",
		description:
			"this site. built with the TanStack Start framework, hosted on Cloudflare Workers.",
		date: "2026-08-02",
		role: "solo",
		link: "https://rorycondict.com",
		source: "https://github.com/rorycondict/portfolio",
		tools: ["TanStack Start", "Cloudflare Workers", "Wrangler CLI", "Biome"],
		languages: ["TypeScript", "JSX (React)", "CSS"],
	},
	{
		name: "evp_website",
		description: "website for Edinburgh VenturePoint.",
		date: "2026-05-05",
		role: "solo",
		link: "https://edinburghventurepoint.com",
		source: "https://github.com/rorycondict/evp-website",
		tools: ["React", "FastAPI", "Vite", "Bun"],
		languages: ["TypeScript", "JSX (React)", "CSS", "Python"],
	},
	{
		name: "pearlcat",
		description: "a mod for a game called 'rain world'.",
		date: "2023-08-10",
		role: "team",
		link: "https://steamcommunity.com/sharedfiles/filedetails/?id=3013739512",
		source: "https://github.com/rorycondict/pearlcat",
		tools: ["Unity Engine", "MonoMod", "dnSpy"],
		languages: ["C#", "HLSL", "Python"],
		featured: true,
	},
];
