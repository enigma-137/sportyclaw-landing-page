"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const stats = [
  { label: "Win Rate", value: 73, suffix: "%" },
  { label: "Predictions / Month", value: 320, suffix: "+" },
  { label: "Active Members", value: 12, suffix: "K+" },
  { label: "Months Tracked", value: 18, suffix: "" },
]

function AnimatedNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!active) return
    let frame: number
    const duration = 1800
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCurrent(Math.floor(eased * target))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [active, target])

  return (
    <span>
      {current}
      {suffix}
    </span>
  )
}

export function Performance() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
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
            setIsVisible(true)
            // Stagger the stat cards
            cardsRef.current.forEach((card, i) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = "1"
                  card.style.transform = "translateY(0) scale(1)"
                }, i * 100)
              }
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="performance" ref={sectionRef} className="relative bg-secondary/50 px-6 py-24 md:py-32">
      {/* Top edge glow */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.19 145 / 0.3), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
          Performance
        </h2>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          <div className="h-1 w-8 bg-accent" />
          <div className="h-1 w-4 bg-accent/60" />
          <div className="h-1 w-2 bg-accent/30" />
        </div>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Numbers do not lie. Here is what SpotiClaw has delivered — tracked,
          verified, and fully transparent.
        </p>

        <div className="mt-16 grid gap-px bg-border md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative overflow-hidden bg-secondary/70 backdrop-blur-sm p-8 text-center transition-all duration-700 ease-out md:p-10"
              style={{ opacity: 0, transform: "translateY(24px) scale(0.96)" }}
            >
              {/* Hover spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(250px circle at var(--mouse-x) var(--mouse-y), oklch(0.65 0.19 145 / 0.08), transparent 60%)",
                }}
                aria-hidden="true"
              />

              <p className="relative font-mono text-5xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-6xl">
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  active={isVisible}
                />
              </p>
              <p className="relative mt-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>

              {/* Bottom glow line on hover */}
              <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-500 group-hover:w-3/4" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
