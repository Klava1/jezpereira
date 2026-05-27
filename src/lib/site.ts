export const site = {
  name: "Jez Pereira",
  title: "Jez Pereira — Writer, Builder",
  description:
    "Essays, notes, and projects by Jez Pereira. Built quietly with Next.js, MDX, and Motion.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  social: {
    github: "https://github.com/jezpereira",
    x: "https://x.com/jezpereira",
    email: "mailto:hello@jezpereira.com",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Writing" },
    { href: "/about", label: "About" },
  ],
} as const;

export type Site = typeof site;
