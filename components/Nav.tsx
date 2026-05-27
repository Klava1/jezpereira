'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/story', label: 'The Story' },
  { href: '/music', label: 'The Music' },
  { href: '/live', label: 'Live' },
  { href: '/family', label: 'The Family' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-[padding] duration-300
        px-(--gutter) backdrop-blur-md
        ${scrolled ? 'py-3 bg-[rgba(10,10,11,0.92)]' : 'py-6'}`}
      style={{
        ['--gutter' as string]: 'clamp(1.25rem, 4vw, 3rem)',
        background: scrolled
          ? 'rgba(10,10,11,0.92)'
          : 'linear-gradient(to bottom, rgba(10,10,11,0.92), rgba(10,10,11,0))',
      }}
    >
      <Link href="/" className="flex items-center gap-3 font-mono text-[0.95rem] tracking-[0.3em] uppercase text-ink">
        <span aria-hidden className="block w-0 h-0 border-l-[7px] border-r-[7px] border-l-transparent border-r-transparent border-b-[12px] border-b-accent" />
        <span>Jez Pereira</span>
      </Link>

      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex gap-10 font-mono text-[0.9rem] tracking-[0.22em] uppercase">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative transition-colors hover:text-ink ${active ? 'text-ink' : 'text-ink-soft'}`}
                >
                  {link.label}
                  {active && (
                    <span aria-hidden className="absolute -bottom-[6px] inset-x-0 h-px bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <a
        href="mailto:info@jezpereira.com"
        className="hidden md:inline-block font-mono text-[0.9rem] tracking-[0.22em] uppercase text-ink pb-2 border-b border-accent transition-opacity hover:opacity-70"
      >
        Booking
      </a>

      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden font-mono text-[0.9rem] tracking-[0.22em] uppercase text-ink"
        aria-label="Toggle menu"
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full bg-background border-b border-line px-(--gutter) py-8 md:hidden">
          <ul className="flex flex-col gap-6 font-mono text-[0.9rem] tracking-[0.22em] uppercase">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-soft hover:text-ink">{link.label}</Link>
              </li>
            ))}
            <li>
              <a href="mailto:info@jezpereira.com" className="text-ink border-b border-accent pb-1 inline-block">Booking</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
