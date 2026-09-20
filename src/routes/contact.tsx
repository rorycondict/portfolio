import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatTitle } from "@/utils";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: formatTitle("ping rory") },
			{
				name: "description",
				content:
					"reach out to me with a question, offer, or just to have a quick chat.",
			},
		],
	}),
	component: Contact,
});

type Status = "idle" | "sending" | "sent" | "error";

type PromptFieldProps = {
	label: string;
	name: string;
	placeholder?: string;
	hint?: string;
	type?: "text" | "email";
	autocomplete?: string;
	maxLength?: number;
	value: string;
	onChange: (value: string) => void;
};

function PromptField({
	label,
	name,
	placeholder,
	hint,
	type = "text",
	autocomplete,
	maxLength = 200,
	value,
	onChange,
}: PromptFieldProps) {
	return (
		<label className="flex flex-row items-baseline gap-1 text-sm w-full cursor-text">
			<span className="text-terminal-important uppercase shrink-0 min-w-[8ch]">
				{label}=
			</span>
			<span className="text-fg shrink-0">"</span>
			<input
				type={type}
				name={name}
				required
				maxLength={maxLength}
				autoComplete={autocomplete}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="field-sizing-content min-w-[16ch] max-w-full bg-transparent outline-0 placeholder-shown:outline-1 outline-dashed outline-muted placeholder:text-muted p-1 caret-fg-highlight"
				placeholder={placeholder}
			/>
			<span className="text-fg shrink-0">"</span>
			{hint ? <span className="text-muted shrink-0"># {hint}</span> : null}
		</label>
	);
}

function MessageField({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className="flex flex-col gap-1 text-sm w-full">
			<label
				htmlFor="message"
				className="flex flex-row items-baseline gap-x-2 cursor-text"
			>
				<span className="text-terminal-important shrink-0">$MESSAGE=</span>
				<span className="text-fg">"</span>
				<span className="text-muted"># what's on your mind?</span>
			</label>
			<textarea
				id="message"
				name="message"
				required
				maxLength={5000}
				rows={6}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="your_message"
				className="w-full bg-transparent outline-dashed outline-muted p-2 outline-0 placeholder-shown:outline-1 resize-y content-box caret-fg-highlight placeholder:text-muted"
			/>
			<span className="text-fg">"</span>
		</div>
	);
}

function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<Status>("idle");
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("sending");
		setError(null);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			});

			if (!response.ok) {
				const data = await response.json().catch(() => null);
				throw new Error(
					typeof data === "string" ? data : "failed to send message.",
				);
			}

			setStatus("sent");
		} catch (err) {
			setStatus("error");
			setError(err instanceof Error ? err.message : "failed to send message.");
		}
	}

	if (status === "sent") {
		return (
			<div className="flex flex-col items-center gap-3">
				<p className="text-terminal-important border p-2">message sent.</p>
				<p>thanks for reaching out!</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-2 max-w-md w-full"
		>
			<PromptField
				label="$name"
				name="name"
				placeholder="john_doe"
				hint="your name"
				value={name}
				onChange={setName}
			/>

			<PromptField
				label="$email"
				name="email"
				type="email"
				placeholder="you@example.com"
				hint="so I can reply"
				value={email}
				onChange={setEmail}
			/>

			<MessageField value={message} onChange={setMessage} />

			{error ? <p className="text-terminal-field">{error}</p> : null}

			<button
				type="submit"
				disabled={status === "sending"}
				className="text-md self-start cursor-pointer text-terminal-accent underline decoration-terminal-accent/25 decoration-2 underline-offset-4 transition-colors duration-300 hover:text-fg-highlight hover:decoration-fg-highlight disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
			>
				$ {status === "sending" ? "sending..." : "./send -f email.txt"}
			</button>
		</form>
	);
}

function Contact() {
	return (
		<section className="flex flex-col gap-3 items-center">
			<div className="text-center max-w-md w-full mx-auto flex flex-col items-center">
				<h1>I'm always open to chat!</h1>
			</div>

			<p>
				you can reach me at{" "}
				<a href="mailto:hi@rorycondict.com">hi@rorycondict.com</a>
			</p>

			<p className="pb-5">alternatively, just use the contact form below:</p>

			<ContactForm />
		</section>
	);
}
