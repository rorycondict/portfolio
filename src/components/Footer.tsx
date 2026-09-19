import Separator from "./Separator";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="text-sm text-center flex flex-col max-w-2xl w-full mx-auto pt-10 justify-between">
			<Separator md={45} />
			<div className="flex flex-col">
				<p>
					<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
						CC BY-NC-SA 4.0
					</a>{" "}
					&copy; {year} rory condict.
				</p>
				<p className="text-muted">
					{/** biome-ignore lint/suspicious/noCommentText: intentional */}
					// EOF
				</p>
			</div>
		</footer>
	);
}
