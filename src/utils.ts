export function formatTitle(pageTitle?: string) {
	const baseTitle = "rory.condict:~$";
	return pageTitle ? `${baseTitle} ${pageTitle}` : baseTitle;
}

export function normalizePath(pathname: string) {
	return pathname.replace(/\/+$/, "") || "/";
}

export function formatMonthYear(isoDate: string) {
	return new Date(isoDate).toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	});
}

export function isExternalUrl(value?: string): value is string {
	return /^https?:\/\//.test(value ?? "");
}

export function formatDateRange(from: string, to?: string) {
	const start = formatMonthYear(from);
	if (!to) return `${start} - Present`;

	const end = formatMonthYear(to);
	return start === end ? start : `${start} - ${end}`;
}
