"use client"

import { useEffect, useRef, useCallback } from "react"

const steps = [
  {
    number: "01",
    title: "Join the Bot",
    description:
      "Start a conversation with SportyClaw on Telegram. One tap and you are in.",
  },
  {
    number: "02",
    title: "Receive Predictions",
    description:
      "Get AI-analyzed picks delivered before every match. No noise, just data.",
  },
  {
    number: "03",
    title: "Make Smarter Bets",
    description:
      "Use transparent insights to sharpen your edge. Track results in real time.",
  },
]

export function HowItWorks() {
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
              el.style.transform = "translateY(0)"
            }, parseInt(delay))
          }
        })
      },
      { threshold: 0.15 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-secondary/50 px-6 py-24 md:py-32"
    >
      {/* Top edge glow */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.19 145 / 0.3), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
          How It Works
        </h2>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          <div className="h-1 w-8 bg-accent" />
          <div className="h-1 w-4 bg-accent/60" />
          <div className="h-1 w-2 bg-accent/30" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[i] = el }}
              data-delay={i * 150}
              className="group relative border-t border-border pt-8 transition-all duration-700 ease-out"
              style={{ opacity: 0, transform: "translateY(32px)" }}
            >
              {/* Mouse hover glow on card */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), oklch(0.65 0.19 145 / 0.06), transparent 60%)",
                }}
                aria-hidden="true"
              />

              <span className="relative font-mono text-5xl font-bold text-accent/20 transition-colors duration-300 group-hover:text-accent/50">
                {step.number}
              </span>
              <h3 className="mt-4 font-mono text-xl font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Bottom accent line on hover */}
              <div className="mt-6 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
