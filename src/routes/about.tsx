import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { formatTitle } from "@/utils";
import IconLink from "../components/common/IconLink";
import Separator from "../components/common/Separator";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: formatTitle("whoami") },
			{
				name: "description",
				content: "learn a bit more about me, my interests, and my hobbies.",
			},
		],
	}),
	component: About,
});

const fields: [string, string][] = [
	["Education", "University of Edinburgh"],
	["Major", "BEng Computer Science"],
	["Locale", "en_GB"],
];

const terminalColors: [string, string][] = [
	["#0C0C0C", "#767676"],
	["#C50F1F", "#E74856"],
	["#13A10E", "#16C60C"],
	["#C19C00", "#F9F1A5"],
	["#0037DA", "#3B78FF"],
	["#881798", "#B4009E"],
	["#3A96DD", "#61D6D6"],
	["#CCCCCC", "#F2F2F2"],
];

function AsciiArt() {
	return (
		<div className="flex flex-wrap justify-center">
			<pre className="ascii-art text-[8px] md:text-[10px] md:pr-5 pb-3">
				{`

░██░████  ░███████  ░██░████ ░██    ░██
░███     ░██    ░██ ░███     ░██    ░██
░██      ░██    ░██ ░██      ░██    ░██
░██      ░██    ░██ ░██      ░██   ░███
░██       ░███████  ░██       ░█████░██
                                    ░██
                              ░███████`}
			</pre>
			<pre className="ascii-art text-[8px] md:text-[10px] ">
				{`                                       ░██  ░██             ░██
                                       ░██                  ░██
 ░███████   ░███████  ░████████   ░████████ ░██ ░███████  ░████████
░██    ░██ ░██    ░██ ░██    ░██ ░██    ░██ ░██░██    ░██    ░██
░██        ░██    ░██ ░██    ░██ ░██    ░██ ░██░██           ░██
░██    ░██ ░██    ░██ ░██    ░██ ░██   ░███ ░██░██    ░██    ░██
 ░███████   ░███████  ░██    ░██  ░█████░██ ░██ ░███████      ░████ `}
				<span className="text-terminal-field">░██</span>
				{`

`}
			</pre>
		</div>
	);
}

function TerminalFields() {
	return (
		<dl className="grid grid-cols-[auto_1fr] gap-x-3 text-sm">
			{fields.map(([label, value]) => (
				<Fragment key={label}>
					<dt className="text-terminal-field">{label}:</dt>
					<dd>{value}</dd>
				</Fragment>
			))}
		</dl>
	);
}

function ColorPalette() {
	return (
		<div className="flex flex-col pt-4">
			{[0, 1].map((row) => (
				<div key={row} className="flex flex-row">
					{terminalColors.map(([normal, bright]) => (
						<div
							key={`${normal}-${bright}`}
							className="h-4 w-8"
							style={{ backgroundColor: row === 0 ? normal : bright }}
						/>
					))}
				</div>
			))}
		</div>
	);
}

function SocialLinks() {
	return (
		<div className="flex flex-col gap-3">
			<p>find me on:</p>

			<ul className="flex flex-row gap-5">
				<li>
					<IconLink
						href="https://github.com/rorycondict"
						icon={<FaGithub size={20} />}
					>
						GitHub
					</IconLink>
				</li>
				<li>
					<IconLink
						href="https://www.linkedin.com/in/rorycondict/"
						icon={<FaLinkedin size={20} />}
					>
						LinkedIn
					</IconLink>
				</li>
			</ul>

			<p>
				...or mail me at{" "}
				<a href="mailto:hi@rorycondict.com">hi@rorycondict.com</a>
			</p>
		</div>
	);
}

function About() {
	return (
		<section className="flex flex-col">
			<div className="mx-auto flex flex-col items-center">
				<AsciiArt />
				<Separator />
				<TerminalFields />
				<ColorPalette />
			</div>
			<div className="flex flex-col pt-15 max-w-xl mx-auto w-full gap-10">
				<p>hey, I'm Rory.</p>

				<p>
					I like software. currently studying CS as an undergrad - I'm pursuing
					ML and cybersecurity in particular.
				</p>

				<p>
					my hobbies include game development, digital art, and photography.
				</p>

				<SocialLinks />
			</div>
		</section>
	);
}
