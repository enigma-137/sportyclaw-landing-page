"use client"

import { useEffect, useRef } from "react"
import { GlowOrbs } from "./glow-orbs"

const features = [
  {
    title: "Instant Predictions",
    description: "Receive AI-generated picks directly in your Telegram chat. No apps, no logins, no friction.",
  },
  {
    title: "Real-Time Updates",
    description: "Live match updates and adjusted picks as conditions change. Stay informed every second.",
  },
  {
    title: "Active Community",
    description: "Connect with thousands of sharp bettors. Share insights, discuss picks, celebrate wins.",
  },
]

export function TelegramSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay || "0"
            setTimeout(() => {
              el.style.opacity = "1"
              el.style.transform = "translateX(0)"
            }, parseInt(delay))
          }
        })
      },
      { threshold: 0.15 }
    )

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-secondary/50 px-6 py-24 md:py-32">
      {/* Edge glow lines */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.19 145 / 0.2), transparent)" }}
        aria-hidden="true"
      />

      <GlowOrbs count={2} maxSize={350} minSize={180} />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">Built for Telegram</span>
            </h2>

            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              <div className="h-1 w-8 bg-accent" />
              <div className="h-1 w-4 bg-accent/60" />
              <div className="h-1 w-2 bg-accent/30" />
            </div>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              No bloated apps. No dashboards to learn. SpotiClaw lives where you
              already are — Telegram. Fast, direct, and always on.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://t.me/spoticlaw_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-primary px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.65_0.19_145_/_0.3)]"
              >
                <span className="relative z-10">Open Bot</span>
                <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
              </a>
              <a
                href="https://t.me/spoticlaw_community"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_20px_oklch(0.65_0.19_145_/_0.1)]"
              >
                Join Community
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                ref={(el) => { itemsRef.current[i] = el }}
                data-delay={i * 150}
                className="group border-l-2 border-accent/40 pl-6 transition-all duration-700 ease-out hover:border-accent"
                style={{ opacity: 0, transform: "translateX(32px)" }}
              >
                <h3 className="font-mono text-base font-bold uppercase tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
