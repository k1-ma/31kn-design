/* Landing page — desktop preview, mobile preview side-by-side via design canvas */
const { useState: useS, useEffect: useE } = React;

function LandingDesktop() {
  return (
    <div style={{ width: 1200, background: "var(--bg)", borderRadius: 18, overflow: "hidden", border: "1px solid var(--border)" }}>
      {/* Top bar */}
      <header style={{ position: "sticky", top: 0, zIndex: 10, background: "color-mix(in oklch, var(--bg) 80%, transparent)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "var(--font-display)", fontWeight: 700 }}>К</div>
            <span className="font-display" style={{ fontWeight: 700, fontSize: 18 }}>Koshyk</span>
          </div>
          <nav style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--text-muted)" }}>
            <span>Можливості</span><span>Безпека</span><span>FAQ</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icons.github /> GitHub</span>
          </nav>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="muted tiny" style={{ alignSelf: "center", marginRight: 8 }}>UA · EN</span>
            <button className="btn btn-md btn-outline">Увійти</button>
            <button className="btn btn-md btn-primary">Спробувати</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ position: "relative", padding: "80px 32px 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top right, var(--brand-soft), transparent 60%)", opacity: 0.7, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.25, pointerEvents: "none", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center", position: "relative" }}>
          <div>
            <span className="badge brand" style={{ height: 24, padding: "0 10px" }}>v2 · оновлено</span>
            <h1 className="font-display" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.03em", margin: "16px 0 20px" }}>Твої гроші,<br/><span style={{ color: "var(--brand)" }}>під контролем.</span></h1>
            <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.55, maxWidth: 480, marginBottom: 28 }}>Простий облік доходів, витрат і бюджетів. Працює офлайн. Без реклами. <span style={{ color: "var(--text)", fontWeight: 500 }}>Без преміум-планів.</span></p>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-lg btn-primary">Почати безкоштовно <Icons.arrow /></button>
              <button className="btn btn-lg btn-outline">Дивитися демо</button>
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 36, fontSize: 13, color: "var(--text-subtle)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icons.check style={{ color: "var(--success)" }} /> 30 секунд на реєстрацію</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icons.check style={{ color: "var(--success)" }} /> Працює офлайн</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icons.check style={{ color: "var(--success)" }} /> Open-source</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PhoneMockHero />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section style={{ padding: "32px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <span className="muted tiny" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.18em" }}>Тисячі вже користуються</span>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ height: 22, width: 100, background: "var(--surface-3)", borderRadius: 4, opacity: 0.7 }} />
          ))}
        </div>
      </section>

      {/* Feature row alt left/right */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p className="sec-eyebrow" style={{ textAlign: "center" }}>Можливості</p>
          <h2 className="font-display" style={{ fontSize: 44, fontWeight: 700, textAlign: "center", letterSpacing: "-0.02em", margin: "8px 0 56px" }}>Усе, що треба. Нічого зайвого.</h2>
          {[
            { t: "Бюджети, які попереджають", b: "Сповіщення на 80% і 100%. Тижневі, місячні, річні. Перенос залишків.", side: "left" },
            { t: "Цілі з прогресом", b: "Кожна копійка має ціль. Візуальний кільцевий прогрес, дедлайн, конфеті на 100%.", side: "right" },
            { t: "Аналітика, що читається", b: "Категорії, тренди, cashflow. Tap по сегменту — фільтр у транзакціях.", side: "left" },
          ].map((f, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: f.side === "left" ? "1fr 1.2fr" : "1.2fr 1fr", gap: 48, alignItems: "center", padding: "32px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
              <div style={{ order: f.side === "left" ? 0 : 1 }}>
                <span className="badge brand">0{i+1}</span>
                <h3 className="font-display" style={{ fontSize: 32, fontWeight: 600, margin: "12px 0 8px", letterSpacing: "-0.02em" }}>{f.t}</h3>
                <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 380 }}>{f.b}</p>
              </div>
              <div style={{ order: f.side === "left" ? 1 : 0, height: 280, background: "var(--surface-2)", borderRadius: "var(--r-2xl)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                {i === 0 && <BudgetVignette />}
                {i === 1 && <GoalVignette />}
                {i === 2 && <AnalyticsVignette />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compare */}
      <section style={{ padding: "60px 32px", background: "var(--surface-2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="sec-eyebrow" style={{ textAlign: "center" }}>Чому Koshyk</p>
          <h2 className="font-display" style={{ fontSize: 36, fontWeight: 700, textAlign: "center", margin: "8px 0 32px" }}>Порівняй сам</h2>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-2xl)", border: "1px solid var(--border)", overflow: "hidden" }}>
            {[
              ["Безкоштовно назавжди", true, false, false],
              ["Працює офлайн (PWA)", true, "частково", false],
              ["Без реклами", true, false, "частково"],
              ["Open-source", true, false, false],
              ["Мульти-валюта", true, true, true],
              ["Приватність даних", "локально", "хмара", "хмара"],
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "14px 20px", borderTop: i ? "1px solid var(--border)" : "none", alignItems: "center", fontSize: 14 }}>
                <span style={{ fontWeight: 500 }}>{row[0]}</span>
                {row.slice(1).map((v, j) => (
                  <span key={j} style={{ textAlign: "center", color: v === true ? "var(--success)" : v === false ? "var(--text-subtle)" : "var(--text-muted)" }}>
                    {v === true ? <Icons.check /> : v === false ? <Icons.x style={{ opacity: 0.4 }} /> : <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{v}</span>}
                  </span>
                ))}
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 20px", borderTop: "1px solid var(--border)", background: "var(--surface-2)", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", color: "var(--text-subtle)", letterSpacing: "0.1em" }}>
              <span></span><span style={{ textAlign: "center", color: "var(--brand)" }}>Koshyk</span><span style={{ textAlign: "center" }}>App A</span><span style={{ textAlign: "center" }}>App B</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 48px", borderRadius: "var(--r-3xl)", background: "linear-gradient(135deg, var(--brand) 0%, oklch(0.45 0.16 290) 100%)", color: "white", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "var(--sh-brand)" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 40%)" }} />
          <h2 className="font-display" style={{ fontSize: 52, fontWeight: 700, letterSpacing: "-0.025em", margin: 0, lineHeight: 1.05, position: "relative" }}>Почни сьогодні.</h2>
          <p style={{ marginTop: 12, fontSize: 17, opacity: 0.85, position: "relative" }}>30 секунд на реєстрацію — твої фінанси у твоїх руках.</p>
          <button className="btn btn-lg" style={{ marginTop: 28, background: "white", color: "var(--brand)", position: "relative" }}>Почати безкоштовно <Icons.arrow /></button>
        </div>
      </section>

      <footer style={{ padding: "32px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", maxWidth: 1100, margin: "0 auto", fontSize: 13, color: "var(--text-subtle)" }}>
        <span>© 2026 Koshyk · Made with ♥ in Ukraine</span>
        <span style={{ display: "flex", gap: 16 }}><span>Privacy</span><span>ToS</span><span>GitHub</span></span>
      </footer>
    </div>
  );
}

function PhoneMockHero() {
  return (
    <div style={{ width: 280, height: 580, borderRadius: 48, background: "#0a0c14", padding: 8, boxShadow: "var(--sh-5)", transform: "rotate(-2deg)" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 40, background: "var(--surface)", overflow: "hidden", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}><span>9:41</span><span>●●●</span></div>
        <div className="muted tiny">Привіт, Анно ✦</div>
        <div className="font-display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>42 580 <span className="muted" style={{ fontSize: 16, fontWeight: 400 }}>₴</span></div>
        <div className="muted tiny" style={{ marginTop: -4 }}>Чисті активи</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ padding: 10, borderRadius: "var(--r-md)", background: "var(--surface-2)" }}><div className="muted tiny">Витрачено</div><div className="tabular" style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>8 240 ₴</div></div>
          <div style={{ padding: 10, borderRadius: "var(--r-md)", background: "var(--surface-2)" }}><div className="muted tiny">Заробив</div><div className="tabular" style={{ fontWeight: 600, fontSize: 14, marginTop: 2, color: "var(--success)" }}>+25 000 ₴</div></div>
        </div>
        <div style={{ padding: 12, borderRadius: "var(--r-lg)", background: "var(--surface-2)", marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 8 }}><span>Їжа · бюджет</span><span className="tabular" style={{ fontWeight: 600 }}>62%</span></div>
          <div style={{ height: 6, background: "var(--surface-3)", borderRadius: "var(--r-full)", overflow: "hidden" }}><div style={{ height: "100%", width: "62%", background: "var(--brand)" }} /></div>
        </div>
        {[["🍔","Кафе","−280"],["🚗","Транспорт","−110"],["💼","Зарплата","+25 000"]].map((r,i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 4px", borderTop: i ? "1px solid var(--border)" : "none" }}>
            <span style={{ fontSize: 18 }}>{r[0]}</span>
            <span style={{ flex: 1, fontSize: 12 }}>{r[1]}</span>
            <span className="tabular" style={{ fontSize: 12, fontWeight: 600, color: r[2].startsWith("+") ? "var(--success)" : "var(--text)" }}>{r[2]} ₴</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BudgetVignette() {
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Ring pct={82} size={72} />
        <Ring pct={45} size={72} />
        <Ring pct={100} size={72} label="✓" />
      </div>
      <div className="toast" style={{ background: "var(--surface)" }}>
        <span className="ico" style={{ background: "var(--warning-soft)", color: "oklch(0.5 0.16 75)" }}>!</span>
        <div className="grow"><div style={{ fontWeight: 500, fontSize: 13 }}>Їжа · 80% витрачено</div><div className="muted tiny">Залишилось 410 ₴ до кінця місяця</div></div>
      </div>
    </div>
  );
}
function GoalVignette() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <Ring pct={68} size={120} stroke={10} />
      <div className="font-display" style={{ fontWeight: 600 }}>Відпустка ✈️</div>
      <div className="muted tiny tabular">34 000 ₴ з 50 000 ₴</div>
    </div>
  );
}
function AnalyticsVignette() {
  const bars = [40, 65, 30, 80, 55, 70, 45];
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 160, gap: 6 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? "var(--brand)" : "var(--brand-soft)", borderRadius: "var(--r-sm) var(--r-sm) 0 0" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-subtle)" }}>
        {["П","В","С","Ч","П","С","Н"].map((d, i) => <span key={i}>{d}</span>)}
      </div>
    </div>
  );
}

function LandingMobile() {
  return (
    <div style={{ width: 390, background: "var(--bg)", borderRadius: 32, overflow: "hidden", border: "1px solid var(--border)", padding: "8px" }}>
      <div style={{ background: "var(--surface)", borderRadius: 28, overflow: "hidden" }}>
        {/* mobile hero */}
        <div style={{ padding: "20px 20px 32px", position: "relative", background: "radial-gradient(ellipse at top, var(--brand-soft), transparent 70%)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--brand)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>К</div>
              <span className="font-display" style={{ fontWeight: 700 }}>Koshyk</span>
            </div>
            <button className="btn btn-sm btn-outline">Увійти</button>
          </div>
          <h1 className="font-display" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.03em", margin: "0 0 14px" }}>Твої гроші,<br/><span style={{ color: "var(--brand)" }}>під контролем.</span></h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.5, margin: "0 0 20px" }}>Простий облік. Працює офлайн. Без реклами.</p>
          <button className="btn btn-xl btn-primary">Почати безкоштовно</button>
        </div>
        {/* feature snippets */}
        <div style={{ padding: "32px 20px" }}>
          <p className="sec-eyebrow">Що всередині</p>
          <div className="col" style={{ marginTop: 12 }}>
            {[["💰","Бюджети, які попереджають","80% / 100%, тижневі, річні"],["🎯","Цілі з кільцевим прогресом","Конфеті на 100%"],["📊","Аналітика, що читається","Категорії · тренди · cashflow"]].map((f,i) => (
              <div key={i} style={{ padding: 16, borderRadius: "var(--r-2xl)", background: "var(--surface-2)", display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 24 }}>{f[0]}</span>
                <div><div style={{ fontWeight: 600, fontSize: 14 }}>{f[1]}</div><div className="muted tiny">{f[2]}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 20px 32px" }}>
          <div style={{ padding: 32, borderRadius: "var(--r-3xl)", background: "linear-gradient(135deg, var(--brand) 0%, oklch(0.45 0.16 290) 100%)", color: "white", textAlign: "center" }}>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Почни сьогодні</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 16 }}>30 секунд на реєстрацію</div>
            <button className="btn btn-md" style={{ background: "white", color: "var(--brand)", width: "100%" }}>Спробувати</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="canvas-section">
      <p className="sec-eyebrow">02 — Marketing</p>
      <h2 className="sec-title">Лендінг (мобайл + десктоп)</h2>
      <p className="sec-subtitle">Sticky topbar з blur, hero з gradient + grid pattern, alternating feature rows, comparison таблиця (без брендових імен — додати самостійно), final CTA блок з gradient. Анімації — fadeUp на in-view, magnetic hover на CTA, gentle rotate на phone mock.</p>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
        <LandingDesktop />
        <LandingMobile />
      </div>
    </div>
  );
}
window.Landing = Landing;
