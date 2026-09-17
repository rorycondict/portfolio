import type { ReactNode } from "react";

type IconLinkProps = {
	href: string;
	icon: ReactNode;
	children: ReactNode;
};

export default function IconLink({ href, icon, children }: IconLinkProps) {
	return (
		<a href={href} className="flex gap-2">
			{icon}
			{children}
		</a>
	);
}
