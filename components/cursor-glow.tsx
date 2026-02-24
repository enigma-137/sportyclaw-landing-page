"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY + window.scrollY
    }

    const handleScroll = () => {
      mouseY = mouseY - window.scrollY + window.scrollY
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08
      currentY += (mouseY - currentY) * 0.08

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] opacity-0 transition-opacity duration-500 md:opacity-100"
      style={{
        background:
          "radial-gradient(circle, oklch(0.65 0.19 145 / 0.07) 0%, oklch(0.65 0.19 145 / 0.03) 30%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  )
}
