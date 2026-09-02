import { motion, easeOut } from "motion/react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import IconLink from "@/components/IconLink";

const ANIM_DELAY = 0.2;

export default function Home() {
  return (
    <>
      <section id="intro">
        <motion.h1
          className="text-8xl tracking-[0.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: easeOut,
            duration: 2.5,
            delay: ANIM_DELAY,
          }}
        >
          rory condict
        </motion.h1>
        <br />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ease: easeOut,
            duration: 1,
            delay: ANIM_DELAY + 1.0,
          }}
        >
          hi, welcome to my portfolio{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: easeOut,
              duration: 1,
              delay: ANIM_DELAY + 2.5,
            }}
            className="text-[10px]"
          >
            (work in progress...)
          </motion.span>
        </motion.h2>
      </section>

      <section className="mt-10" id="social">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: easeOut,
            duration: 2.5,
            delay: ANIM_DELAY,
          }}
        >
          rory condict
        </motion.h1>
        <ul className="flex gap-10">
          <li>
            <IconLink
              href="https://www.linkedin.com/in/rorycondict/"
              icon={FaLinkedin}
              label="LinkedIn"
            />
          </li>
          <li>
            <IconLink
              href="https://github.com/forthfora"
              icon={FaGithub}
              label="GitHub"
            />
          </li>
        </ul>
      </section>
    </>
  );
}
