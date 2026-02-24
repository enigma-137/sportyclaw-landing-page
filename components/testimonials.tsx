"use client"

const testimonials = [
  {
    username: "@betking247",
    text: "SpotiClaw called 3 upsets last week that nobody saw coming. This bot is built different.",
  },
  {
    username: "@sportsalpha",
    text: "Transparent results, no fluff. First prediction service I actually trust.",
  },
  {
    username: "@sharpedge_picks",
    text: "The speed of delivery is insane. I get picks before most analysts have even looked at the data.",
  },
  {
    username: "@goaltimemax",
    text: "Been in the community for 3 months. My ROI has never been this consistent. Unreal.",
  },
  {
    username: "@clutchbet99",
    text: "No hype, just results. SpotiClaw backs everything up with data and full history.",
  },
  {
    username: "@livebetpro",
    text: "I ditched three other tipsters after my first week with SpotiClaw. Night and day difference.",
  },
  {
    username: "@winnersonly_fc",
    text: "The Telegram community alone is worth it. Thousands of sharp minds sharing insights daily.",
  },
  {
    username: "@datadriven_punter",
    text: "Finally a prediction service that shows its losses too. Full transparency. Respect.",
  },
]

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="relative overflow-hidden px-0 py-24 md:py-32">
      {/* Section top glow */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.19 145 / 0.2), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
          The Community Speaks
        </h2>

        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          <div className="h-1 w-8 bg-accent" />
          <div className="h-1 w-4 bg-accent/60" />
          <div className="h-1 w-2 bg-accent/30" />
        </div>
      </div>

      <div className="relative mt-16">
        {/* Fade edges with glow */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
        />

        <div className="animate-scroll-left flex w-max gap-6">
          {doubled.map((testimonial, i) => (
            <div
              key={`${testimonial.username}-${i}`}
              className="group w-80 shrink-0 border border-border bg-card/70 backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_oklch(0.65_0.19_145_/_0.08)]"
            >
              <p className="font-mono text-sm font-semibold text-accent transition-colors duration-300 group-hover:text-accent">
                {testimonial.username}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                {`"${testimonial.text}"`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
