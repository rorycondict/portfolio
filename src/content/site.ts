import { PROJECTS } from "@/content/projects";
import { EMAIL, SOCIALS } from "@/content/socials";
import { formatTitle, normalizePath } from "@/utils";

export const SITE = {
	name: "rory condict.",
	description: "a small collection of my things.",
	url: "https://rorycondict.com",
	image: "https://rorycondict.com/preview.png",
};

const PERSON = {
	"@type": "Person",
	"@id": `${SITE.url}/#person`,
	name: "Rory Condict",
	alternateName: "rorycondict",
	description: "Computer science undergraduate at the University of Edinburgh.",
	jobTitle: "Computer Science Student",
	url: SITE.url,
	email: `mailto:${EMAIL}`,
	sameAs: Object.values(SOCIALS).map((social) => social.href),
	affiliation: {
		"@type": "CollegeOrUniversity",
		name: "University of Edinburgh",
	},
	knowsAbout: ["Software Engineering", "Machine Learning", "Cybersecurity"],
};

const PERSON_REF = {
	"@type": "Person",
	"@id": PERSON["@id"],
	name: PERSON.name,
};

export type Page = {
	path: string;
	label: string;
	title: string;
	description: string;
	command: string;
	structuredData?: Record<string, unknown>;
};

export const PAGES = {
	home: {
		path: "/",
		label: "home",
		title: SITE.name,
		description: SITE.description,
		command: "ssh rory@portfolio",
		structuredData: {
			"@graph": [
				{
					"@type": "WebSite",
					"@id": `${SITE.url}/#website`,
					name: SITE.name,
					alternateName: PERSON.name,
					url: SITE.url,
					author: { "@id": PERSON["@id"] },
				},
				PERSON,
			],
		},
	},
	about: {
		path: "/about",
		label: "about",
		title: formatTitle("whoami"),
		description: "learn a bit more about me, my interests, and my hobbies.",
		command: "cat README.md",
		structuredData: {
			"@type": "ProfilePage",
			mainEntity: PERSON,
		},
	},
	projects: {
		path: "/projects",
		label: "projects",
		title: formatTitle("ls projects/"),
		description:
			"browse the projects I've created, contributed to, or am currently maintaining.",
		command: "ls projects/",
		structuredData: {
			"@type": "CollectionPage",
			mainEntity: {
				"@type": "ItemList",
				itemListElement: PROJECTS.map((project, index) => ({
					"@type": "ListItem",
					position: index + 1,
					item: {
						"@type": "SoftwareSourceCode",
						name: project.name,
						description: project.description,
						url: project.link ?? project.source,
						codeRepository: project.source,
						programmingLanguage: project.languages,
						dateCreated: project.date,
						author: PERSON_REF,
					},
				})),
			},
		},
	},
	contact: {
		path: "/contact",
		label: "contact",
		title: formatTitle("ping rory"),
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
	const { title, structuredData } = page;
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
			{ name: "twitter:url", content: url },
			structuredData && {
				"script:ld+json": {
					"@context": "https://schema.org",
					...structuredData,
				},
			},
		],
		links: [{ rel: "canonical", href: url }],
	};
}
