export function formatTitle(pageTitle?: string) {
	const baseTitle = "rory:~$";
	return pageTitle ? `${baseTitle} ${pageTitle}` : baseTitle;
}
