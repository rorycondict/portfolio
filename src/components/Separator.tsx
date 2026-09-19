type SeparatorProps = {
	mobile?: number;
	md?: number;
};

export default function Separator({ mobile = 30, md = 40 }: SeparatorProps) {
	return (
		<div aria-hidden="true">
			<div className="md:hidden">{"-".repeat(mobile)}</div>
			<div className="hidden md:block">{"-".repeat(md)}</div>
		</div>
	);
}
