export const ROUTE_COMMANDS: Record<string, string[]> = {
	"/": ["ssh rory@portfolio"],
	"/about": ["cd ~", "whoami"],
	"/projects": ["cd ~/projects", "ls"],
	"/contact": ["cd ~/contact", "ping rory"],
};
