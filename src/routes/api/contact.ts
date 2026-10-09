import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import escapeHtml from "escape-html";
import { Resend } from "resend";
import { CONTACT_LIMITS } from "@/content/contact";
import { TURNSTILE } from "@/content/turnstile";

// Comfortably above the largest valid body: 5000 characters at up to
// 3 bytes each, plus the name, email and Turnstile token
const MAX_BODY_BYTES = 32 * 1024;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
	name?: unknown;
	email?: unknown;
	message?: unknown;
	token?: unknown;
}

function field(value: unknown) {
	return typeof value === "string" ? value.trim() : "";
}

interface SiteverifyResult {
	success?: boolean;
	action?: string;
	hostname?: string;
}

async function verifyTurnstile(token: unknown, ip: string | null) {
	const expectedHostnames = new Set(
		(env.TURNSTILE_HOSTNAMES ?? "")
			.split(",")
			.map((hostname) => hostname.trim())
			.filter(Boolean),
	);

	if (
		typeof token !== "string" ||
		token.length === 0 ||
		token.length > 2048 ||
		expectedHostnames.size === 0
	) {
		return false;
	}

	const body = new URLSearchParams({
		secret: env.TURNSTILE_SECRET_KEY,
		response: token,
	});
	if (ip) body.set("remoteip", ip);

	let result: SiteverifyResult;
	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body,
				signal: AbortSignal.timeout(10_000),
			},
		);
		if (!response.ok) return false;
		result = (await response.json()) as SiteverifyResult;
	} catch {
		return false;
	}

	return (
		result.success === true &&
		result.action === TURNSTILE.actions.contact &&
		expectedHostnames.has(result.hostname ?? "")
	);
}

export const Route = createFileRoute("/api/contact")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const ip = request.headers.get("cf-connecting-ip");
				const { success } = await env.CONTACT_RATE_LIMITER.limit({
					key: ip ?? "unknown",
				});

				if (!success) {
					return Response.json(
						"Too many messages. Please try again in a minute.",
						{ status: 429 },
					);
				}

				const tooLarge = () =>
					Response.json("Request is too large.", { status: 413 });

				if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
					return tooLarge();
				}

				// The header can be missing or wrong, so check the real size too
				const raw = await request.text();
				if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
					return tooLarge();
				}

				let body: ContactBody;

				try {
					body = JSON.parse(raw);
				} catch {
					return Response.json("Invalid JSON.", { status: 400 });
				}

				if (typeof body !== "object" || body === null) {
					return Response.json("Invalid JSON.", { status: 400 });
				}

				const name = field(body.name);
				const email = field(body.email);
				const message = field(body.message);

				if (!name || !email || !message) {
					return Response.json("Name, email and message are required.", {
						status: 400,
					});
				}

				if (
					name.length > CONTACT_LIMITS.name ||
					email.length > CONTACT_LIMITS.email
				) {
					return Response.json("Name or email is too long.", { status: 400 });
				}

				if (message.length > CONTACT_LIMITS.message) {
					return Response.json(
						`Message is too long. Maximum ${CONTACT_LIMITS.message} characters.`,
						{ status: 400 },
					);
				}

				if (!EMAIL_PATTERN.test(email)) {
					return Response.json("Please enter a valid email address.", {
						status: 400,
					});
				}

				if (!(await verifyTurnstile(body.token, ip))) {
					return Response.json("Verification failed. Please try again.", {
						status: 403,
					});
				}

				const resend = new Resend(env.RESEND_API_KEY);

				const safeName = escapeHtml(name);
				const safeEmail = escapeHtml(email);
				const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

				const { error } = await resend.emails.send({
					from: "contact@mail.rorycondict.com",
					to: "hi@rorycondict.com",
					replyTo: email,
					// Collapse whitespace so line breaks can't reach the subject header
					subject: `A new contact form message: ${name.replace(/\s+/g, " ")}`,
					html: `
						<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
							<p><strong>Name</strong><br>${safeName}</p>

							<p><strong>Email</strong><br>${safeEmail}</p>

							<p><strong>Message</strong><br>${safeMessage}</p>
						</div>
					`,
				});

				if (error) {
					console.error("Resend error:", error);
					return Response.json("Failed to send message.", { status: 500 });
				}

				return Response.json({ success: true });
			},
		},
	},
});
