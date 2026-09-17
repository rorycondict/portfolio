import { createFileRoute } from "@tanstack/react-router";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { formatTitle } from "@/utils";
import IconLink from "../components/IconLink";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: [{ title: formatTitle("whoami") }],
	}),
	component: About,
});

function About() {
	return (
		<section className="flex flex-col">
			<div className="mx-auto flex flex-col items-center">
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
						{`                                       ░██ ░██              ░██
                                       ░██                  ░██
 ░███████   ░███████  ░████████   ░████████ ░██ ░███████  ░████████
░██    ░██ ░██    ░██ ░██    ░██ ░██    ░██ ░██░██    ░██    ░██
░██        ░██    ░██ ░██    ░██ ░██    ░██ ░██░██           ░██
░██    ░██ ░██    ░██ ░██    ░██ ░██   ░███ ░██░██    ░██    ░██
 ░███████   ░███████  ░██    ░██  ░█████░██ ░██ ░███████      ░████ ░██

`}
					</pre>
				</div>
				<div>{"-".repeat(20)}</div>
			</div>
			<div className="flex flex-col pt-5 max-w-xl mx-auto w-full gap-10">
				<p>hey, I'm Rory.</p>

				<p>
					I like software; currently studying CS as an undergrad. I'm pursuing
					ML and cybersecurity in particular.
				</p>

				<p>
					my hobbies include game development, digital art, and photography.
				</p>

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
			</div>
		</section>
	);
}
