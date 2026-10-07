import { useHydrated } from "@tanstack/react-router";
import Separator from "@/components/common/Separator";

export default function Footer() {
	const hydrated = useHydrated();
	const year = hydrated ? new Date().getFullYear() : __BUILD_YEAR__;

	return (
		<footer className="text-sm flex flex-col max-w-2xl w-full pt-20 justify-between">
			<Separator md={45} />
			<div className="flex flex-col">
				<p>
					<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
						CC BY-NC-SA 4.0
					</a>{" "}
					&copy; {year} rory condict
					<span className="text-terminal-field">.</span>
				</p>
				<p className="text-muted">EOF</p>
			</div>
		</footer>
	);
}
