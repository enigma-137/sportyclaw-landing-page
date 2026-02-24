"use client"

import { useEffect, useRef } from "react"

interface LightBlob {
  x: string
  y: string
  size: string
  color: string
  delay: string
}

const blobs: LightBlob[] = [
  // Top center warm glow (like the reference image)
  {
    x: "50%",
    y: "2%",
    size: "800px",
    color: "oklch(0.45 0.12 30 / 0.12)",
    delay: "0s",
  },
  // Subtle accent glow mid-left
  {
    x: "15%",
    y: "35%",
    size: "600px",
    color: "oklch(0.65 0.19 145 / 0.04)",
    delay: "2s",
  },
  // Warm glow mid-right
  {
    x: "85%",
    y: "25%",
    size: "500px",
    color: "oklch(0.45 0.1 30 / 0.06)",
    delay: "4s",
  },
  // Deep mid section accent
  {
    x: "60%",
    y: "55%",
    size: "700px",
    color: "oklch(0.65 0.19 145 / 0.03)",
    delay: "1s",
  },
  // Bottom warm ambient
  {
    x: "40%",
    y: "75%",
    size: "600px",
    color: "oklch(0.4 0.08 30 / 0.05)",
    delay: "3s",
  },
  // Very subtle bottom-right
  {
    x: "80%",
    y: "90%",
    size: "500px",
    color: "oklch(0.65 0.19 145 / 0.03)",
    delay: "5s",
  },
]

export function AmbientLights() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = ((e.clientY + window.scrollY) / document.documentElement.scrollHeight - 0.5) * 2
      el.style.setProperty("--mouse-x", `${x * 15}px`)
      el.style.setProperty("--mouse-y", `${y * 15}px`)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-ambient-drift"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            animationDelay: blob.delay,
            transform: `translate(calc(-50% + var(--mouse-x)), calc(-50% + var(--mouse-y)))`,
            transition: "transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      ))}
    </div>
  )
}
