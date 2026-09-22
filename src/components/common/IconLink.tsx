import type { ReactNode } from "react";

type IconLinkProps = {
	href: string;
	icon: ReactNode;
	children: ReactNode;
	className?: string;
};

export default function IconLink({
	href,
	icon,
	children,
	className = "",
}: IconLinkProps) {
	return (
		<a href={href} className={`flex gap-2 ${className}`}>
			{icon}
			{children}
		</a>
	);
}
