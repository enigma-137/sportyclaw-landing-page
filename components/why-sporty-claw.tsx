"use client"

import { useEffect, useRef, useCallback } from "react"

const propositions = [
  {
    title: "Data-Driven Predictions",
    description:
      "Every pick is backed by rigorous statistical models and real-time data analysis. No gut feelings.",
  },
  {
    title: "Fast Delivery",
    description:
      "Predictions hit your Telegram before the match starts. Always ahead of the curve.",
  },
  {
    title: "Transparent Results",
    description:
      "Full performance tracking, open history, no hidden losses. See every call we have ever made.",
  },
  {
    title: "Community-Backed",
    description:
      "Join thousands of bettors sharing insights, strategies, and results in real time.",
  },
]

export function WhySportyClaw() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cardsRef.current.forEach((card) => {
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    section.addEventListener("mousemove", handleMouseMove)
    return () => section.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay || "0"
            setTimeout(() => {
              el.style.opacity = "1"
              el.style.transform = "translateY(0) scale(1)"
            }, parseInt(delay))
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="why-sporty-claw" ref={sectionRef} className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
          Why SportyClaw
        </h2>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          <div className="h-1 w-8 bg-accent" />
          <div className="h-1 w-4 bg-accent/60" />
          <div className="h-1 w-2 bg-accent/30" />
        </div>

        <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
          {propositions.map((prop, i) => (
            <div
              key={prop.title}
              ref={(el) => { cardsRef.current[i] = el }}
              data-delay={i * 120}
              className="group relative overflow-hidden bg-background/60 backdrop-blur-sm p-8 transition-all duration-700 ease-out md:p-10"
              style={{ opacity: 0, transform: "translateY(32px) scale(0.98)" }}
            >
              {/* Hover spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), oklch(0.65 0.19 145 / 0.07), transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* Corner accent on hover */}
              <div className="absolute left-0 top-0 h-0 w-px bg-accent transition-all duration-500 group-hover:h-8" aria-hidden="true" />
              <div className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-8" aria-hidden="true" />

              <h3 className="relative font-mono text-lg font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                {prop.title}
              </h3>
              <p className="relative mt-3 leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
