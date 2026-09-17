export type Project = {
	name: string;
	description: string;
	link?: string;
	repo?: string;
	tools: string[];
	languages: string[];
};

export const PROJECTS: Project[] = [
	{
		name: "portfolio",
		description:
			"this site. built with the TanStack Start framework, hosted on Cloudflare Workers.",
		link: "https://github.com/rorycondict/portfolio",
		tools: ["TanStack Start", "React", "Tailwind CSS", "Cloudflare Workers"],
		languages: ["TypeScript", "JSX (React)"],
	},
];
