import { useEffect, useState } from "react";
import {
	applyThemeMode,
	nextThemeMode,
	readThemeMode,
	type ThemeMode,
} from "@/theme";

export default function ThemeToggle() {
	const [mode, setMode] = useState<ThemeMode | null>(null);

	useEffect(() => {
		setMode(readThemeMode());
	}, []);

	function cycle() {
		const next = nextThemeMode(mode ?? "auto");
		applyThemeMode(next);
		setMode(next);
	}

	return (
		<button
			type="button"
			onClick={cycle}
			title="switch theme"
			className={`nav-link cursor-pointer ${mode ? "" : "invisible"}`}
		>
			theme:{mode ?? "auto"}
		</button>
	);
}
