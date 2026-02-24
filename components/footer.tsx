export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-mono text-sm font-bold tracking-tight text-foreground">
          SPOTICLAW
        </span>
        <p className="text-sm text-muted-foreground">
          {"© 2026 SpotiClaw. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
