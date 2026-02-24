"use client"

import { useEffect, useRef } from "react"

interface GlowOrbsProps {
  count?: number
  color?: string
  maxSize?: number
  minSize?: number
}

export function GlowOrbs({
  count = 3,
  color = "oklch(0.65 0.19 145",
  maxSize = 400,
  minSize = 200,
}: GlowOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const orbs = container.querySelectorAll<HTMLDivElement>("[data-orb]")
    let rafId: number
    const speeds = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.3,
      y: (Math.random() - 0.5) * 0.2,
    }))
    const positions = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))

    const animate = () => {
      orbs.forEach((orb, i) => {
        positions[i].x += speeds[i].x
        positions[i].y += speeds[i].y

        if (positions[i].x > 100 || positions[i].x < -10) speeds[i].x *= -1
        if (positions[i].y > 100 || positions[i].y < -10) speeds[i].y *= -1

        orb.style.left = `${positions[i].x}%`
        orb.style.top = `${positions[i].y}%`
      })
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [count])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = minSize + Math.random() * (maxSize - minSize)
        return (
          <div
            key={i}
            data-orb
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle, ${color} / ${0.04 + i * 0.01}) 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        )
      })}
    </div>
  )
}
