import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { TbMoon, TbSun, TbSunMoon } from "react-icons/tb";
import {
	applyThemeMode,
	nextThemeMode,
	readThemeMode,
	type ThemeMode,
} from "@/theme";

const THEME_ICONS: Record<ThemeMode, IconType> = {
	auto: TbSunMoon,
	light: TbSun,
	dark: TbMoon,
};

export default function ThemeToggle({ size = 20 }: { size?: number }) {
	const [mode, setMode] = useState<ThemeMode | null>(null);

	useEffect(() => {
		setMode(readThemeMode());
	}, []);

	function cycle() {
		const next = nextThemeMode(mode ?? "auto");
		applyThemeMode(next);
		setMode(next);
	}

	const current = mode ?? "auto";
	const Icon = THEME_ICONS[current];

	return (
		<button
			type="button"
			onClick={cycle}
			aria-label={`theme: ${current}, switch theme`}
			title={`theme: ${current}`}
			className={`nav-link cursor-pointer px-2 md:px-0 ${mode ? "" : "invisible"}`}
		>
			<Icon size={size} />
		</button>
	);
}
