"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { GlowOrbs } from "./glow-orbs"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
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
    const els = [headlineRef.current, subRef.current, ctaRef.current]
    els.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0"
        el.style.transform = "translateY(32px)"
        setTimeout(() => {
          el.style.transition = "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, 300 + i * 200)
      }
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Mouse-following spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-700 md:opacity-100"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.19 145 / 0.08) 0%, oklch(0.65 0.19 145 / 0.03) 25%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient floating glow orbs */}
      <GlowOrbs count={4} maxSize={500} minSize={250} />

      {/* Static light beams */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-0 h-full w-px"
          style={{
            background: "linear-gradient(to bottom, oklch(0.65 0.19 145 / 0.15), transparent 40%)",
          }}
        />
        <div
          className="absolute left-[30%] top-0 h-3/4 w-px -rotate-6"
          style={{
            background: "linear-gradient(to bottom, oklch(0.985 0 0 / 0.06), transparent 50%)",
          }}
        />
        <div
          className="absolute right-[30%] top-0 h-3/4 w-px rotate-6"
          style={{
            background: "linear-gradient(to bottom, oklch(0.985 0 0 / 0.06), transparent 50%)",
          }}
        />
      </div>

      {/* Claw scratch lines - parallax on mouse */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -right-20 top-1/4 h-96 w-px rotate-12 bg-border/40 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(12deg) translateY(${mousePos.y * -8}px)` }}
        />
        <div
          className="absolute -right-16 top-1/4 h-80 w-px rotate-12 bg-border/30 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(12deg) translateY(${mousePos.y * -12}px)` }}
        />
        <div
          className="absolute -right-12 top-1/4 h-72 w-px rotate-12 bg-border/20 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(12deg) translateY(${mousePos.y * -16}px)` }}
        />
        <div
          className="absolute -left-20 bottom-1/4 h-96 w-px -rotate-12 bg-border/40 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(-12deg) translateY(${mousePos.y * 8}px)` }}
        />
        <div
          className="absolute -left-16 bottom-1/4 h-80 w-px -rotate-12 bg-border/30 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(-12deg) translateY(${mousePos.y * 12}px)` }}
        />
        <div
          className="absolute -left-12 bottom-1/4 h-72 w-px -rotate-12 bg-border/20 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(-12deg) translateY(${mousePos.y * 16}px)` }}
        />
      </div>

      {/* Main content with mouse parallax */}
      <div
        className="relative z-10 mx-auto max-w-4xl text-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px)`,
        }}
      >
        <h1
          ref={headlineRef}
          className="font-mono text-5xl font-bold uppercase leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl"
        >
          <span className="text-balance">
            Predict Sharper.
            <br />
            <span className="relative inline-block">
              Win Smarter.
              {/* Accent glow under text */}
              <span
                className="absolute -bottom-2 left-0 h-1 w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, oklch(0.65 0.19 145 / 0.6), transparent)",
                }}
                aria-hidden="true"
              />
            </span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:mt-8 md:text-xl"
        >
          AI-powered sports predictions delivered straight to your Telegram.
          Data-driven. Transparent. Relentless.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-12">
          <a
            href="https://t.me/spoticlaw_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full overflow-hidden bg-primary px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.65_0.19_145_/_0.3)] sm:w-auto"
          >
            <span className="relative z-10">Join Telegram Bot</span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
          </a>
          <a
            href="https://t.me/spoticlaw_community"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-border px-8 py-4 text-center text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:border-accent/50 hover:shadow-[0_0_20px_oklch(0.65_0.19_145_/_0.1)] sm:w-auto"
          >
            Join Community
          </a>
        </div>
      </div>

      {/* Claw-mark divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2" aria-hidden="true">
        <div className="h-16 w-px skew-x-[-8deg] bg-border/60" />
        <div className="h-20 w-px bg-accent/40" />
        <div className="h-16 w-px skew-x-[8deg] bg-border/60" />
      </div>
    </section>
  )
}
