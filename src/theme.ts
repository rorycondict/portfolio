export type ThemeMode = "auto" | "light" | "dark";

const THEME_MODES: ThemeMode[] = ["auto", "light", "dark"];

export function readThemeMode(): ThemeMode {
	const theme = document.documentElement.dataset.theme;
	return theme === "light" || theme === "dark" ? theme : "auto";
}

export function nextThemeMode(mode: ThemeMode): ThemeMode {
	return THEME_MODES[(THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length];
}

export function applyThemeMode(mode: ThemeMode) {
	const root = document.documentElement;
	if (mode === "auto") delete root.dataset.theme;
	else root.dataset.theme = mode;

	try {
		if (mode === "auto") window.localStorage.removeItem("theme");
		else window.localStorage.setItem("theme", mode);
	} catch {}
}

export function resolveTheme(): "light" | "dark" {
	const mode = readThemeMode();
	if (mode !== "auto") return mode;
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}
