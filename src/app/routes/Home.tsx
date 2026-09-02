import { motion, easeOut } from "motion/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import IconLink from "@/components/IconLink";
import { Typewriter } from "@/components/typewriter/Typewriter";
import { TypewriterSequenceProvider } from "@/components/typewriter/TypewriterSequenceProvider";

const ANIM_DELAY = 0.2;

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/rorycondict/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/forthfora",
    icon: FaGithub,
    label: "GitHub",
  },
] as const;

export default function Home() {
  return (
    <TypewriterSequenceProvider>
      <section id="intro">
        <h1 className="text-6xl md:text-8xl tracking-[0.5rem]">
          <Typewriter id="name">rory condict</Typewriter>
        </h1>
        <motion.h2
          className="text-4xl pt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: ANIM_DELAY + 1.0,
          }}
        >
          welcome to my website{" "}
          <motion.span
            className="text-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: ANIM_DELAY + 1.5,
            }}
          >
            (work in progress...)
          </motion.span>
        </motion.h2>
      </section>

      <section className="pt-10" id="social">
        <motion.h2
          className="text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: ANIM_DELAY + 2.0,
          }}
        >
          for now, see what I've been up to here:
        </motion.h2>
        <br />

        <motion.ul
          className="flex gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: ANIM_DELAY + 2.5,
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {SOCIAL_LINKS.map(({ href, icon, label }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3, ease: easeOut },
                },
              }}
            >
              <IconLink href={href} icon={icon} label={label} />
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </TypewriterSequenceProvider>
  );
}
