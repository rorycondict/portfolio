type SeparatorProps = {
	length?: number;
};

export default function Separator({ length = 40 }: SeparatorProps) {
	return (
		<div aria-hidden="true">
			<div>{"-".repeat(length)}</div>
		</div>
	);
}
