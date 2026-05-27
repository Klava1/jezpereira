import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}.`,
};

export default function AboutPage() {
  return (
    <article className="prose-jez py-16">
      <h1>About</h1>
      <p>
        Hi, I&apos;m {site.name}. This is the quiet corner of the internet where
        I publish essays, notes, and occasional experiments.
      </p>
      <p>
        Edit this page at{" "}
        <code>src/app/about/page.tsx</code>, or write long-form content as MDX
        files inside <code>content/posts/</code>.
      </p>
      <h2>Elsewhere</h2>
      <ul>
        <li>
          <a href={site.social.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </li>
        <li>
          <a href={site.social.x} target="_blank" rel="noreferrer noopener">
            X / Twitter
          </a>
        </li>
        <li>
          <a href={site.social.email}>Email</a>
        </li>
      </ul>
    </article>
  );
}
