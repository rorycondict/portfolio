import {
	createCsrfMiddleware,
	createMiddleware,
	createStart,
} from "@tanstack/react-start";
import headersFile from "../public/_headers?raw";

// Static assets and prerendered pages get their headers from public/_headers,
// but anything the Worker renders (404s, /api routes) bypasses that file, so
// reuse its "/*" rules here to keep a single source of truth.
const SECURITY_HEADERS = parseHeadersRules(headersFile, "/*");

function parseHeadersRules(file: string, path: string) {
	const headers: [string, string][] = [];
	let inRule = false;

	for (const line of file.split(/\r?\n/)) {
		if (!line.trim() || line.trimStart().startsWith("#")) continue;

		if (!/^\s/.test(line)) {
			inRule = line.trim() === path;
		} else if (inRule) {
			const separator = line.indexOf(":");
			headers.push([
				line.slice(0, separator).trim(),
				line.slice(separator + 1).trim(),
			]);
		}
	}

	return headers;
}

const securityHeadersMiddleware = createMiddleware().server(
	async ({ next }) => {
		const result = await next();
		// Copy the response, as headers on fetched or redirect responses are immutable
		const response = new Response(result.response.body, result.response);

		for (const [name, value] of SECURITY_HEADERS) {
			if (!response.headers.has(name)) response.headers.set(name, value);
		}

		return { ...result, response };
	},
);

// Defining startInstance replaces Start's default CSRF protection for server
// functions, so add it back explicitly
const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
	requestMiddleware: [securityHeadersMiddleware, csrfMiddleware],
}));
