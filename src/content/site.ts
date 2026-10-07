import { formatTitle, normalizePath } from "@/utils";

export const SITE = {
	name: "rory condict.",
	description: "a small collection of my things.",
	url: "https://rorycondict.com",
	image: "https://rorycondict.com/preview.webp",
};

export type Page = {
	path: string;
	label: string;
	title?: string;
	description: string;
	command: string;
};

export const PAGES = {
	home: {
		path: "/",
		label: "home",
		description: SITE.description,
		command: "ssh rory@portfolio",
	},
	about: {
		path: "/about",
		label: "about",
		title: "whoami",
		description: "learn a bit more about me, my interests, and my hobbies.",
		command: "cat README.md",
	},
	projects: {
		path: "/projects",
		label: "projects",
		title: "ls projects/",
		description:
			"browse the projects I've created, contributed to, or am currently maintaining.",
		command: "ls projects/",
	},
	contact: {
		path: "/contact",
		label: "contact",
		title: "ping rory",
		description:
			"reach out to me with a question, offer, or just to have a quick chat.",
		command: "nano email.txt",
	},
} as const satisfies Record<string, Page>;

export const NAV_PAGES = [PAGES.about, PAGES.projects, PAGES.contact];

export function findPage(pathname: string): Page | undefined {
	const path = normalizePath(pathname);
	return Object.values(PAGES).find((page) => page.path === path);
}

export function pageHead(page: Page) {
	const title = formatTitle(page.title);
	const url = new URL(page.path, SITE.url).href;

	return {
		meta: [
			{ title },
			{ name: "description", content: page.description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: page.description },
			{ property: "og:url", content: url },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: page.description },
		],
		links: [{ rel: "canonical", href: url }],
	};
}
