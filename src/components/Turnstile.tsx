import { useEffect, useRef, useState } from "react";
import { TURNSTILE } from "@/content/turnstile";
import { resolveTheme } from "@/theme";

const SCRIPT_SRC =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileOptions = {
	sitekey: string;
	action?: string;
	theme?: "light" | "dark" | "auto";
	appearance?: "always" | "execute" | "interaction-only";
	callback?: (token: string) => void;
	"expired-callback"?: () => void;
	"error-callback"?: () => void;
	"before-interactive-callback"?: () => void;
	"after-interactive-callback"?: () => void;
};

declare global {
	interface Window {
		turnstile?: {
			render: (container: HTMLElement, options: TurnstileOptions) => string;
			remove: (widgetId: string) => void;
		};
	}
}

type Status =
	| "verifying"
	| "interactive"
	| "verified"
	| "failed"
	| "unavailable";

const STATUS_LINES: Record<Status, { text: string; className: string }> = {
	verifying: { text: "# checking for bots...", className: "text-muted" },
	interactive: { text: "# one quick check:", className: "text-muted" },
	verified: {
		text: "# you're human! (probably)",
		className: "text-terminal-important",
	},
	failed: {
		text: "# bot check failed, retrying...",
		className: "text-terminal-field",
	},
	unavailable: {
		text: "# couldn't load the bot check. try emailing me instead.",
		className: "text-terminal-field",
	},
};

let scriptPromise: Promise<void> | undefined;

function loadTurnstile() {
	scriptPromise ??= new Promise<void>((resolve, reject) => {
		const script = document.createElement("script");
		script.src = SCRIPT_SRC;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => {
			scriptPromise = undefined;
			script.remove();
			reject(new Error("failed to load turnstile"));
		};
		document.head.appendChild(script);
	});
	return scriptPromise;
}

type TurnstileProps = {
	action: string;
	onToken: (token: string | null) => void;
};

export default function Turnstile({ action, onToken }: TurnstileProps) {
	const container = useRef<HTMLDivElement>(null);
	const onTokenRef = useRef(onToken);
	onTokenRef.current = onToken;
	const [status, setStatus] = useState<Status>("verifying");

	useEffect(() => {
		let widgetId: string | undefined;
		let cancelled = false;

		loadTurnstile()
			.then(() => {
				if (cancelled || !container.current || !window.turnstile) return;
				widgetId = window.turnstile.render(container.current, {
					sitekey: TURNSTILE.siteKey,
					action,
					theme: resolveTheme(),
					appearance: "interaction-only",
					callback: (token) => {
						setStatus("verified");
						onTokenRef.current(token);
					},
					"expired-callback": () => {
						setStatus("verifying");
						onTokenRef.current(null);
					},
					"error-callback": () => {
						setStatus("failed");
						onTokenRef.current(null);
					},
					"before-interactive-callback": () => setStatus("interactive"),
					"after-interactive-callback": () => setStatus("verifying"),
				});
			})
			.catch(() => {
				if (!cancelled) setStatus("unavailable");
			});

		return () => {
			cancelled = true;
			if (widgetId) window.turnstile?.remove(widgetId);
		};
	}, [action]);

	const line = STATUS_LINES[status];

	return (
		<div className="flex flex-col gap-2 text-sm">
			<p className={line.className} aria-live="polite">
				{line.text}
			</p>
			<div ref={container} />
		</div>
	);
}
