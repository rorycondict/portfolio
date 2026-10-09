import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import IconLink from "@/components/common/IconLink";
import Separator from "@/components/common/Separator";
import { PAGES, pageHead } from "@/content/site";
import { EMAIL, SOCIALS } from "@/content/socials";

export const Route = createFileRoute("/about")({
	head: () => pageHead(PAGES.about),
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
		<div className="ascii-fit flex w-full flex-wrap justify-start">
			<pre className="ascii-art md:pr-5 pb-3">
				{`

░██░████  ░███████  ░██░████ ░██    ░██
░███     ░██    ░██ ░███     ░██    ░██
░██      ░██    ░██ ░██      ░██    ░██
░██      ░██    ░██ ░██      ░██   ░███
░██       ░███████  ░██       ░█████░██
                                    ░██
                              ░███████`}
			</pre>
			<pre className="ascii-art">
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
				{Object.values(SOCIALS).map(({ label, href, icon: Icon }) => (
					<li key={href}>
						<IconLink href={href} icon={<Icon size={20} />}>
							{label}
						</IconLink>
					</li>
				))}
			</ul>

			<p>
				...or mail me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
			</p>
		</div>
	);
}

function About() {
	return (
		<section className="flex flex-col">
			<div className="flex w-full flex-col items-start">
				<AsciiArt />
				<Separator length={30} />
				<TerminalFields />
				<ColorPalette />
			</div>
			<div className="flex flex-col pt-15 max-w-xl w-full gap-10">
				<h1 className="text-xl font-bold">
					hey, I'm rory<span className="text-terminal-field">.</span>
				</h1>

				<p>I love software! currently studying CS as an undergrad.</p>

				<p>
					my hobbies include game development, digital art, and photography.
				</p>

				<SocialLinks />
			</div>
		</section>
	);
}
