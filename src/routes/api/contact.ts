import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import escapeHtml from "escape-html";
import { Resend } from "resend";
import { TURNSTILE } from "@/content/turnstile";

interface ContactBody {
	name?: string;
	email?: string;
	message?: string;
	token?: unknown;
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

				let body: ContactBody;

				try {
					body = (await request.json()) as ContactBody;
				} catch {
					return Response.json("Invalid JSON.", { status: 400 });
				}

				const name = body.name?.trim();
				const email = body.email?.trim();
				const message = body.message?.trim();

				if (!name || !email || !message) {
					return Response.json("Name, email and message are required.", {
						status: 400,
					});
				}

				if (message.length > 5000) {
					return Response.json(
						"Message is too long. Maximum 5000 characters.",
						{ status: 400 },
					);
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
					subject: `A new contact form message: ${name}`,
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
