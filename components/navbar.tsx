"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why SportyClaw", href: "#why-sporty-claw" },
  { label: "Performance", href: "#performance" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_1px_20px_oklch(0_0_0/0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="group font-mono text-xl font-bold tracking-tight text-foreground">
          <span className="transition-colors duration-300 group-hover:text-accent">SPORTY</span>CLAW
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://t.me/+olobU_gDicQ5MGU0"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_oklch(0.65_0.19_145/0.3)]"
          >
            <span className="relative z-10">Join Bot Community</span>
            <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`border-t border-border bg-background/95 backdrop-blur-xl md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://t.me/+olobU_gDicQ5MGU0"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Join Bot Community
          </a>
        </div>
      </div>
    </nav>
  )
}
