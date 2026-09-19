import { useEffect, useRef, useState } from "react";

const UNSET = Symbol("unset");

export type TerminalCommandLine = {
	id: number;
	text: string;
	path: string;
	typed: number;
	complete: boolean;
};

export type TerminalCommandProps = {
	commands: string[];
	trigger?: unknown;
	prompt?: (path: string) => React.ReactNode;
	initialPath?: string;
	bufferSize?: number;
	typeSpeed?: number;
	className?: string;
	promptClassName?: string;
};

const defaultPrompt = (path: string) => (
	<>
		<span className="text-terminal-important">rory@portfolio</span>:
		<span className="text-terminal-accent">{path}</span>
	</>
);

function resolveCd(cwd: string, command: string): string | undefined {
	const match = /^cd(?:\s+(.+?))?\s*$/.exec(command.trim());
	if (!match) return undefined;
	const arg = match[1] ?? "~";
	const rooted = arg.startsWith("~") ? arg : `${cwd}/${arg}`;
	const parts: string[] = [];
	for (const part of rooted.split("/")) {
		if (part === "" || part === "." || part === "~") continue;
		if (part === "..") {
			if (parts.length > 0) parts.pop();
			continue;
		}
		parts.push(part);
	}
	return parts.length === 0 ? "~" : `~/${parts.join("/")}`;
}

export default function TerminalCommand({
	commands,
	trigger,
	prompt = defaultPrompt,
	initialPath = "~",
	bufferSize = 2,
	typeSpeed = 35,
	className = "",
	promptClassName = "",
}: TerminalCommandProps) {
	const [lines, setLines] = useState<TerminalCommandLine[]>([]);
	const [queue, setQueue] = useState<string[]>([]);
	const [cwd, setCwd] = useState(initialPath);
	const nextId = useRef(0);
	const lastTrigger = useRef<unknown>(UNSET);

	useEffect(() => {
		if (lastTrigger.current === trigger) return;
		lastTrigger.current = trigger;
		setCwd(initialPath);
		setQueue((pending) => [...pending, ...commands]);
	}, [commands, initialPath, trigger]);

	const active = lines.find((line) => !line.complete);

	useEffect(() => {
		if (active || queue.length === 0) return;
		const [text, ...rest] = queue;
		setQueue(rest);
		const id = nextId.current++;
		setLines((prev) =>
			[...prev, { id, text, path: cwd, typed: 0, complete: false }].slice(
				-bufferSize,
			),
		);
	}, [active, cwd, queue, bufferSize]);

	useEffect(() => {
		if (!active) return;
		if (active.typed >= active.text.length) {
			const nextPath = resolveCd(cwd, active.text);
			if (nextPath !== undefined) setCwd(nextPath);
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
	}, [active, cwd, typeSpeed]);
	const slots = Array.from(
		{ length: Math.max(0, bufferSize - lines.length) },
		(_, i) => lines.length + i + 1,
	);

	return (
		<div
			className={`border-2 px-4 py-3 flex flex-col gap-1 text-sm ${className}`}
			aria-live="polite"
		>
			{lines.map((line) => (
				<p key={line.id} className="whitespace-pre-wrap break-all">
					<span className={`mr-2 select-none ${promptClassName}`}>
						{prompt(line.path)}$
					</span>
					<span>{line.text.slice(0, line.typed)}</span>
					{!line.complete && <span className="terminal-caret" aria-hidden />}
				</p>
			))}
			{slots.map((slot) => (
				<p key={`slot-${slot}`} aria-hidden className="invisible">
					{"\u00a0"}
				</p>
			))}
		</div>
	);
}
