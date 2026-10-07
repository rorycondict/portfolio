import { useEffect, useRef } from "react";
import { TURNSTILE } from "@/content/turnstile";
import { resolveTheme } from "@/theme";

const SCRIPT_SRC =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileOptions = {
	sitekey: string;
	action?: string;
	theme?: "light" | "dark" | "auto";
	callback?: (token: string) => void;
	"expired-callback"?: () => void;
	"error-callback"?: () => void;
};

declare global {
	interface Window {
		turnstile?: {
			render: (container: HTMLElement, options: TurnstileOptions) => string;
			remove: (widgetId: string) => void;
		};
	}
}

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
	onLoadError: () => void;
};

export default function Turnstile({
	action,
	onToken,
	onLoadError,
}: TurnstileProps) {
	const container = useRef<HTMLDivElement>(null);
	const callbacks = useRef({ onToken, onLoadError });
	callbacks.current = { onToken, onLoadError };

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
					callback: (token) => callbacks.current.onToken(token),
					"expired-callback": () => callbacks.current.onToken(null),
					"error-callback": () => callbacks.current.onToken(null),
				});
			})
			.catch(() => {
				if (!cancelled) callbacks.current.onLoadError();
			});

		return () => {
			cancelled = true;
			if (widgetId) window.turnstile?.remove(widgetId);
		};
	}, [action]);

	return <div ref={container} className="min-h-16.25" />;
}
