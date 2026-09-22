export function formatTitle(pageTitle?: string) {
	const baseTitle = "rory:~$";
	return pageTitle ? `${baseTitle} ${pageTitle}` : baseTitle;
}

export function formatMonthYear(isoDate: string) {
	return new Date(isoDate).toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
}

export function isExternalUrl(value?: string): value is string {
	return /^https?:\/\//.test(value ?? "");
}
