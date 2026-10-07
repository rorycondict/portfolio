export const ROUTE_COMMANDS: Record<string, string[]> = {
	"/": ["ssh rory@portfolio"],
	"/about": ["cat README.md"],
	"/projects": ["ls projects/"],
	"/contact": ["nano email.txt"],
};

export function normalizeRoutePath(pathname: string) {
	return pathname.replace(/\/+$/, "") || "/";
}
