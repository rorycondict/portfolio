(() => {
	try {
		const theme = window.localStorage.getItem("theme");
		if (theme === "light" || theme === "dark") {
			document.documentElement.dataset.theme = theme;
		}
	} catch {}
})();
