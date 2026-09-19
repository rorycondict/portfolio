import Separator from "./common/Separator";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="text-sm text-center flex flex-col max-w-2xl w-full mx-auto pt-20 justify-between">
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
