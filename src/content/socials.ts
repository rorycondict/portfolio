import type { IconType } from "react-icons";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";

export type Social = {
	label: string;
	href: string;
	icon: IconType;
};

export const SOCIALS = {
	github: {
		label: "GitHub",
		href: "https://github.com/rorycondict",
		icon: TbBrandGithub,
	},
	linkedin: {
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/rorycondict/",
		icon: TbBrandLinkedin,
	},
} as const satisfies Record<string, Social>;

export const EMAIL = "hi@rorycondict.com";
