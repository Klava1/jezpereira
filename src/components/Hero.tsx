"use client";

import { cubicBezier, motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";

const ease = cubicBezier(0.22, 1, 0.36, 1);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <AnimatedGradient reduce={reduce ?? false} />

      <div className="relative">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-5 text-sm font-medium tracking-wider text-[var(--color-ink-muted)] uppercase"
        >
          Hello, I&apos;m Jez.
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Writing about{" "}
          <span className="bg-gradient-to-r from-[oklch(0.68_0.18_35)] via-[oklch(0.7_0.16_320)] to-[oklch(0.65_0.18_240)] bg-clip-text text-transparent">
            craft, calm software, and the slow web
          </span>
          .
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="mt-6 max-w-xl text-pretty text-lg/8 text-[var(--color-ink-muted)]"
        >
          A small, quiet corner of the internet where I publish essays, project
          notes, and the occasional experiment.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] shadow-sm transition hover:opacity-90"
          >
            Read the writing
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium transition hover:bg-black/[0.03] dark:border-white/15 dark:hover:bg-white/[0.04]"
          >
            About me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedGradient({ reduce }: { reduce: boolean }) {
  const baseDuration = reduce ? 0 : 18;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          reduce
            ? { opacity: 0.55 }
            : { opacity: [0.4, 0.65, 0.4], scale: [1, 1.05, 1] }
        }
        transition={
          reduce
            ? { duration: 1.2, ease: "easeOut" }
            : {
                duration: baseDuration,
                ease: "easeInOut",
                repeat: Infinity,
              }
        }
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.16_35/0.55),transparent_70%)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          reduce
            ? { opacity: 0.45 }
            : { opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }
        }
        transition={
          reduce
            ? { duration: 1.2, ease: "easeOut", delay: 0.1 }
            : {
                duration: baseDuration + 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.4,
              }
        }
        className="absolute -top-10 right-[-10%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.72_0.18_320/0.5),transparent_70%)] blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          reduce
            ? { opacity: 0.4 }
            : { opacity: [0.25, 0.5, 0.25], scale: [1, 1.1, 1] }
        }
        transition={
          reduce
            ? { duration: 1.2, ease: "easeOut", delay: 0.2 }
            : {
                duration: baseDuration + 8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 2.8,
              }
        }
        className="absolute top-32 left-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.7_0.16_240/0.45),transparent_70%)] blur-3xl"
      />
    </div>
  );
}
