"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { GlowOrbs } from "./glow-orbs"

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })

    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${e.clientX - rect.left}px`
      spotlightRef.current.style.top = `${e.clientY - rect.top}px`
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            contentRef.current.style.opacity = "1"
            contentRef.current.style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.2 }
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Mouse spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute z-0 h-175 w-175 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-700 md:opacity-100"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.19 145 / 0.1) 0%, oklch(0.65 0.19 145 / 0.04) 25%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      <GlowOrbs count={3} maxSize={400} minSize={200} />

      {/* Claw scratches with parallax */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/4 top-0 h-full w-px -skew-x-6 bg-border/20 transition-transform duration-700 ease-out"
          style={{ transform: `skewX(-6deg) translateY(${mousePos.y * -6}px)` }}
        />
        <div
          className="absolute left-1/3 top-0 h-full w-px skew-x-3 bg-border/10 transition-transform duration-700 ease-out"
          style={{ transform: `skewX(3deg) translateY(${mousePos.y * -10}px)` }}
        />
        <div
          className="absolute right-1/4 top-0 h-full w-px skew-x-6 bg-border/20 transition-transform duration-700 ease-out"
          style={{ transform: `skewX(6deg) translateY(${mousePos.y * 6}px)` }}
        />
        <div
          className="absolute right-1/3 top-0 h-full w-px -skew-x-3 bg-border/10 transition-transform duration-700 ease-out"
          style={{ transform: `skewX(-3deg) translateY(${mousePos.y * 10}px)` }}
        />
      </div>

      {/* Central top light beam */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2"
        style={{ background: "linear-gradient(to bottom, oklch(0.65 0.19 145 / 0.25), transparent)" }}
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-3xl text-center transition-all duration-1000 ease-out"
        style={{
          opacity: 0,
          transform: "translateY(40px)",
        }}
      >
        <h2 className="font-mono text-4xl font-bold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl">
          <span className="text-balance">
            Stop Guessing.
            <br />
            <span className="relative inline-block">
              Start Winning.
              <span
                className="absolute -bottom-2 left-0 h-1 w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, oklch(0.65 0.19 145 / 0.6), transparent)",
                }}
                aria-hidden="true"
              />
            </span>
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Join the sharpest sports prediction community on Telegram. Data-driven
          picks. Full transparency. No excuses.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="$"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full overflow-hidden bg-primary px-10 py-5 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_40px_oklch(0.65_0.19_145/0.4)] sm:w-auto"
          >
            <span className="relative z-10">Join Bot Now</span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
          </a>
          <a
            href="#"
            target="_blank"
            
            rel="noopener noreferrer"
            className="w-full border border-border px-10 py-5 text-center text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_20px_oklch(0.65_0.19_145/0.15)] sm:w-auto"
          >
            Join Community
          </a>
        </div>
      </div>
    </section>
  )
}
