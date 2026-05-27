# Draft Ideas

A scratchpad for copy, taglines, and ideas that aren't on the site yet but
might be one day. Nothing here is shipped — it's just the cutting-room floor.

---

## Hero H1 — taglines

### Currently on the site

> Jez Pereira

### Drafts / alternatives

> **Music is a feeling. *Some people just feel it more.* He's one of them.**
>
> _Original sweeping three-beat line. Strong, but maybe too much for a hero
> that already has "Est. 1993 · Mumbai · London · Miami · Ibiza" doing
> heavy lifting underneath. Hold for an interstitial or a quote block on /story._

---

## Hero sub-sequence — staggered fade-in lines

### Drafts / alternatives

> **Feel the vibe.**
> **Feel the energy.**
> **Let yourself flow.**
> **Let yourself *achieve*.**
>
> _Four-line stagger that animated in beneath the original H1 (1.0s → 1.4s →
> 1.8s → 2.2s, `fadeIn` 1s ease-out, italic Fraunces, accent on "achieve")._
> _Pulled because once the H1 became plain "Jez Pereira", the sub-lines were
> doing the emotional work alone and felt overwritten. Hold for the /story
> intro, a between-movement interstitial, or a closing line._

#### Original markup (for reference)

```tsx
<div className="font-serif italic text-ink-soft leading-[2.2] text-[clamp(0.95rem,1.5vw,1.15rem)] tracking-[0.02em]">
  <span className="block opacity-0" style={{ animation: 'fadeIn 1s ease-out 1.0s forwards' }}>
    Feel the vibe.
  </span>
  <span className="block opacity-0" style={{ animation: 'fadeIn 1s ease-out 1.4s forwards' }}>
    Feel the energy.
  </span>
  <span className="block opacity-0" style={{ animation: 'fadeIn 1s ease-out 1.8s forwards' }}>
    Let yourself flow.
  </span>
  <span className="block opacity-0" style={{ animation: 'fadeIn 1s ease-out 2.2s forwards' }}>
    Let yourself <em className="italic text-accent">achieve</em>.
  </span>
</div>
```

<!-- Add more drafts below this line -->
