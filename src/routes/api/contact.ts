import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import escapeHtml from "escape-html";
import { Resend } from "resend";

interface ContactBody {
	name?: string;
	email?: string;
	message?: string;
	token?: string;
}

async function verifyTurnstile(token: string, ip: string | null) {
	const form = new FormData();
	form.append("secret", env.TURNSTILE_SECRET_KEY);
	form.append("response", token);
	if (ip) form.append("remoteip", ip);

	const response = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{ method: "POST", body: form },
	);
	if (!response.ok) return false;

	const outcome = (await response.json()) as { success: boolean };
	return outcome.success;
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

				if (!body.token) {
					return Response.json("Please complete the verification.", {
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
