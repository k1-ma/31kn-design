/* Phase 4 — Code handoff notes */
function Handoff() {
  const sections = [
    {
      title: "Token mapping",
      meta: "tailwind.config.js → tokens.css",
      rows: [
        ["bg-background / bg-card", "var(--bg) / var(--surface)"],
        ["bg-emerald-500", "var(--brand) — REMOVE all hardcoded emerald usages"],
        ["bg-accent / text-accent", "var(--brand-soft) / var(--brand)"],
        ["text-muted-foreground", "var(--text-muted)"],
        ["border-border", "var(--border)"],
        ["rounded-md / rounded-lg / rounded-2xl", "var(--r-md) / var(--r-lg) / var(--r-2xl)"],
        ["shadow-sm / shadow-md / shadow-lg", "var(--sh-1) / var(--sh-2) / var(--sh-3)"],
      ]
    },
    {
      title: "Files to touch (priority)",
      meta: "Phase 1 PR — foundation only",
      rows: [
        ["app/globals.css", "Replace :root and .dark blocks with tokens.css contents"],
        ["tailwind.config.ts", "Map theme.colors.* to oklch(var(--brand)) etc — keep utility classes working"],
        ["components/ui/button.tsx", "Drop variant=accent; primary now points at --brand"],
        ["components/ui/badge.tsx", "Add success/warning variants matching tokens"],
        ["components/transactions/TransactionRow.tsx", "Mono numerals via .tabular class; ensure sign color"],
        ["components/budgets/BudgetCard.tsx", "Replace inline progress div with <Ring /> primitive"],
      ]
    },
    {
      title: "New primitives to add",
      meta: "components/ui/*",
      rows: [
        ["Ring.tsx", "Circular progress with brand fill — used in budgets, goals, dashboard"],
        ["Sheet.tsx", "Bottom sheet on mobile, dialog on desktop (vaul or Radix Dialog)"],
        ["NumberField.tsx", "Numeric input with prefix slot + step buttons"],
        ["EmptyState.tsx", "Illo + title + body + CTA — DRY the 4 empty screens"],
        ["Tabs (pill variant)", "Match segmented control in DS"],
      ]
    },
    {
      title: "Migration order",
      meta: "ship in 4 PRs",
      rows: [
        ["PR 1", "Tokens + tailwind config + Button/Input/Badge — non-visual safety net"],
        ["PR 2", "Landing page (single route, isolated)"],
        ["PR 3", "Dashboard + Transactions list + TxSheet — biggest UX wins"],
        ["PR 4", "Budgets + Goals + Settings cleanup"],
      ]
    },
  ];

  return (
    <div className="canvas-section">
      <p className="sec-eyebrow">04 — Handoff</p>
      <h2 className="sec-title">Код-нотатки для імплементації</h2>
      <p className="sec-subtitle">Конкретні мапи токенів, файли під редагування та порядок мерджу. Скопіюй у PR-описи або передай Claude Code.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {sections.map((s, i) => (
          <div key={i} className="ds-card" style={{ gridColumn: "span 1" }}>
            <h3>{s.title}</h3>
            <div className="meta">{s.meta}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {s.rows.map((r, j) => (
                <div key={j} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 12, padding: "10px 0", borderTop: j ? "1px solid var(--border)" : "none", fontSize: 12 }}>
                  <code style={{ fontFamily: "var(--font-mono)", color: "var(--brand)", fontSize: 11 }}>{r[0]}</code>
                  <span style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>{r[1]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: 24, borderRadius: "var(--r-2xl)", background: "var(--surface-2)", border: "1px dashed var(--border-strong)" }}>
        <div className="font-display" style={{ fontWeight: 600, marginBottom: 8 }}>Швидкий старт</div>
        <ol style={{ margin: 0, paddingLeft: 20, color: "var(--text-muted)", fontSize: 13, lineHeight: 1.7 }}>
          <li>Скопіюй <code style={{ fontFamily: "var(--font-mono)", color: "var(--brand)" }}>tokens.css</code> у <code style={{ fontFamily: "var(--font-mono)", color: "var(--brand)" }}>app/globals.css</code></li>
          <li>Видали блоки <code style={{ fontFamily: "var(--font-mono)" }}>:root {"{"} --background... {"}"}</code> зі shadcn — токени тепер у tokens.css</li>
          <li>У <code style={{ fontFamily: "var(--font-mono)" }}>tailwind.config</code> замап <code style={{ fontFamily: "var(--font-mono)" }}>theme.extend.colors.brand = "oklch(var(--brand) / &lt;alpha-value&gt;)"</code></li>
          <li>Theme toggle: додай <code style={{ fontFamily: "var(--font-mono)" }}>data-theme="dark"</code> на <code style={{ fontFamily: "var(--font-mono)" }}>&lt;html&gt;</code> через next-themes</li>
        </ol>
      </div>
    </div>
  );
}
window.Handoff = Handoff;
