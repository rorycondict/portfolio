export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="px-20 pt-3">
			<div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
				<p className="m-0 text-sm">
					&copy; {year} rory condict. all rights reserved.
				</p>
			</div>
		</footer>
	);
}
