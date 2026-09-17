export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="text-sm flex flex-row px-20 pt-3 justify-between">
			<div className="flex flex-col">
				<p>&copy; {year} rory condict.</p>
				<p className="text-muted">
					{/** biome-ignore lint/suspicious/noCommentText: intentional */}
					// EOF
				</p>
			</div>
		</footer>
	);
}
