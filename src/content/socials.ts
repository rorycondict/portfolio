import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export type Social = {
	label: string;
	href: string;
	icon: IconType;
};

export const SOCIALS = {
	github: {
		label: "GitHub",
		href: "https://github.com/rorycondict",
		icon: FaGithub,
	},
	linkedin: {
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/rorycondict/",
		icon: FaLinkedin,
	},
} as const satisfies Record<string, Social>;

export const EMAIL = "hi@rorycondict.com";
