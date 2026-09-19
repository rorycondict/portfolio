import { useEffect, useRef, useState } from "react";

const UNSET = Symbol("unset");

export type TerminalCommandLine = {
	id: number;
	text: string;
	typed: number;
	complete: boolean;
};

export type TerminalCommandProps = {
	commands: string[];
	trigger?: unknown;
	prompt?: React.ReactNode;
	bufferSize?: number;
	typeSpeed?: number;
	className?: string;
	promptClassName?: string;
};

const defaultPrompt = (
	<>
		<span className="text-terminal-important">rory</span>:
		<span className="text-terminal-accent">~</span>$
	</>
);

export default function TerminalCommand({
	commands,
	trigger,
	prompt = defaultPrompt,
	bufferSize = 2,
	typeSpeed = 35,
	className = "",
	promptClassName = "",
}: TerminalCommandProps) {
	const [lines, setLines] = useState<TerminalCommandLine[]>([]);
	const [queue, setQueue] = useState<string[]>([]);
	const nextId = useRef(0);
	const lastTrigger = useRef<unknown>(UNSET);

	useEffect(() => {
		if (lastTrigger.current === trigger) return;
		lastTrigger.current = trigger;
		setQueue((pending) => [...pending, ...commands]);
	}, [commands, trigger]);

	const active = lines.find((line) => !line.complete);

	useEffect(() => {
		if (active || queue.length === 0) return;
		const [text, ...rest] = queue;
		setQueue(rest);
		const id = nextId.current++;
		setLines((prev) =>
			[...prev, { id, text, typed: 0, complete: false }].slice(-bufferSize),
		);
	}, [active, queue, bufferSize]);

	useEffect(() => {
		if (!active) return;
		if (active.typed >= active.text.length) {
			setLines((prev) =>
				prev.map((line) =>
					line.id === active.id ? { ...line, complete: true } : line,
				),
			);
			return;
		}
		const timer = setTimeout(() => {
			setLines((prev) =>
				prev.map((line) =>
					line.id === active.id ? { ...line, typed: line.typed + 1 } : line,
				),
			);
		}, typeSpeed);
		return () => clearTimeout(timer);
	}, [active, typeSpeed]);

	return (
		<div
			className={`border-2 px-4 py-3 flex flex-col gap-1 text-sm ${className}`}
			aria-live="polite"
		>
			{lines.map((line) => (
				<p key={line.id} className="whitespace-pre-wrap break-all">
					<span className={`mr-2 select-none ${promptClassName}`}>
						{prompt}
					</span>
					<span>{line.text.slice(0, line.typed)}</span>
					{!line.complete && <span className="terminal-caret" aria-hidden />}
				</p>
			))}
		</div>
	);
}
