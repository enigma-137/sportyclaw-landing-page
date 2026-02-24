"use client"

import { useEffect, useRef, useCallback } from "react"

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
  color: number // 0 = white, 1 = warm, 2 = cool
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: -1, y: -1 })
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)

  const initStars = useCallback((width: number, height: number) => {
    const area = width * height
    const count = Math.min(Math.floor(area / 3500), 500)
    const stars: Star[] = []

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.2,
        baseOpacity: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.006 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: Math.random() < 0.7 ? 0 : Math.random() < 0.5 ? 1 : 2,
      })
    }
    starsRef.current = stars
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
      const width = window.innerWidth
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = scrollHeight * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${scrollHeight}px`
      ctx.scale(dpr, dpr)
      initStars(width, scrollHeight)
    }

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setCanvasSize, 200)
    }

    setCanvasSize()

    // Re-measure after content loads
    const remeasureTimer = setTimeout(setCanvasSize, 500)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    const colorMap = [
      [255, 255, 255],    // white
      [255, 220, 185],    // warm
      [185, 220, 255],    // cool blue
    ]

    const draw = () => {
      timeRef.current += 1
      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2))
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2))

      ctx.clearRect(0, 0, width, height)

      const stars = starsRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mx >= 0 && my >= 0

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const twinkle = Math.sin(timeRef.current * s.twinkleSpeed + s.twinkleOffset)
        let opacity = s.baseOpacity + twinkle * 0.2

        // Mouse proximity glow boost
        if (mouseActive) {
          const dx = s.x - mx
          const dy = s.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            const boost = 1 - dist / 200
            opacity += boost * 0.6
          }
        }

        opacity = Math.max(0.03, Math.min(1, opacity))

        const [r, g, b] = colorMap[s.color]

        // Core star dot
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
        ctx.fill()

        // Soft glow halo for bigger/brighter stars
        if (s.size > 1.0 && opacity > 0.35) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.06})`
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resizeTimer)
      clearTimeout(remeasureTimer)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [initStars])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0 z-0"
      aria-hidden="true"
    />
  )
}
