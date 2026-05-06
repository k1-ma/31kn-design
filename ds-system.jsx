/* global React */
const { useState } = React;

// Tiny inline icons (Lucide-style strokes; we don't have lucide-react in plain HTML)
const I = {
  check: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  x: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  trash: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>,
  eye: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>,
  caret: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><polyline points="6 9 12 15 18 9"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><polyline points="9 18 15 12 9 6"/></svg>,
  filter: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  wallet: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18"/><circle cx="17" cy="15" r="1.5"/></svg>,
  home: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  list: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  pig: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 5c-1.5 0-2.8.4-3.9 1H8.5C5.4 6 3 8.4 3 11.5c0 1.6.7 3 1.7 4l-.7 3.5c-.1.4.2.8.6.8h2c.3 0 .5-.2.6-.5l.3-1.4c.7.2 1.4.3 2.1.3h4c.7 0 1.4-.1 2.1-.3l.3 1.4c.1.3.3.5.6.5h2c.4 0 .7-.4.6-.8l-.7-3.5c1-1 1.7-2.4 1.7-4 0-.6-.1-1.2-.2-1.8 1.1-.5 1.9-1.6 1.9-2.9 0-1.7-1.3-3-3-3z"/><circle cx="9" cy="11" r="1"/></svg>,
  target: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  more: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  github: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .3"/></svg>,
};
window.Icons = I;

// Common atoms
const Btn = ({ variant = "primary", size = "md", children, ...rest }) => (
  <button className={`btn btn-${size} btn-${variant}`} {...rest}>{children}</button>
);
const Field = ({ label, children, help, error }) => (
  <div className="field">
    {label && <label className="field-label">{label}</label>}
    {children}
    {error ? <div className="field-error">{error}</div> : help ? <div className="field-help">{help}</div> : null}
  </div>
);
const Sw = ({ checked, onChange, size }) => (
  <button type="button" onClick={() => onChange(!checked)} className={`sw ${checked ? "on" : ""} ${size === "sm" ? "sm" : ""}`} aria-pressed={checked}>
    <span className="thumb" />
  </button>
);
window.Btn = Btn; window.Field = Field; window.Sw = Sw;

const Ring = ({ pct = 0, size = 88, stroke = 8, label }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg>
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} className="ring-bg" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} className="ring-fg" />
      </svg>
      <div className="ring-text">{label ?? `${pct}%`}</div>
    </div>
  );
};
window.Ring = Ring;

const ColorSwatch = ({ name, varName, sample }) => (
  <div className="swatch">
    <div className="swatch-chip" style={{ background: sample || `var(${varName})` }} />
    <div className="swatch-meta">
      <span className="swatch-name">{name}</span>
      <span className="swatch-val">{varName}</span>
    </div>
  </div>
);

function DSColors() {
  const semantic = [
    ["Brand", "--brand"], ["Brand soft", "--brand-soft"], ["On brand", "--on-brand"],
    ["Background", "--bg"], ["Surface", "--surface"], ["Surface 2", "--surface-2"],
    ["Border", "--border"], ["Border strong", "--border-strong"],
    ["Text", "--text"], ["Text muted", "--text-muted"], ["Text subtle", "--text-subtle"],
    ["Success", "--success"], ["Warning", "--warning"], ["Danger", "--danger"], ["Info", "--info"],
  ];
  return (
    <div className="ds-card full">
      <h3>Semantic colors</h3>
      <div className="meta">2 modes · oklch · use vars, not hex</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {semantic.map(([n, v]) => <ColorSwatch key={v} name={n} varName={v} />)}
      </div>
    </div>
  );
}

function DSType() {
  return (
    <div className="ds-card full">
      <h3>Type ramp</h3>
      <div className="meta">Inter (UI) · Geist (display) · Geist Mono (numbers)</div>
      <div className="type-row">
        <span className="label">display/72</span>
        <span className="sample font-display" style={{ fontSize: 72, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em" }}>Твої гроші ✦</span>
      </div>
      <div className="type-row">
        <span className="label">display/40</span>
        <span className="sample font-display" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.05 }}>Простий облік фінансів</span>
      </div>
      <div className="type-row">
        <span className="label">title/24</span>
        <span className="sample" style={{ fontSize: 24, fontWeight: 600 }}>Бюджети під контролем</span>
      </div>
      <div className="type-row">
        <span className="label">body/16</span>
        <span className="sample" style={{ fontSize: 16, lineHeight: 1.55 }}>Працює офлайн, без реклами, у твоїй кишені</span>
      </div>
      <div className="type-row">
        <span className="label">caption/12</span>
        <span className="sample muted" style={{ fontSize: 12 }}>Сьогодні · 14:32 · Київ</span>
      </div>
      <div className="type-row">
        <span className="label">mono/24</span>
        <span className="sample tabular" style={{ fontSize: 24, fontWeight: 600 }}>−12 340,50 ₴</span>
      </div>
      <div className="type-row">
        <span className="label">mono/14</span>
        <span className="sample tabular muted" style={{ fontSize: 14 }}>UAH · 0.024 БТЦ · 1 230,00 €</span>
      </div>
    </div>
  );
}

function DSRadii() {
  const r = [["sm","--r-sm"],["md","--r-md"],["lg","--r-lg"],["xl","--r-xl"],["2xl","--r-2xl"],["3xl","--r-3xl"]];
  return (
    <div className="ds-card wide">
      <h3>Radii</h3>
      <div className="meta">8 → 36 px scale</div>
      <div className="radii-row">
        {r.map(([n, v]) => (
          <div key={n} className="radii-cell" style={{ borderRadius: `var(${v})` }}>{n}</div>
        ))}
      </div>
    </div>
  );
}

function DSShadows() {
  return (
    <div className="ds-card wide">
      <h3>Shadows</h3>
      <div className="meta">elevation 1 → 5</div>
      <div className="shadow-row">
        {[1,2,3,4,5].map(n => (
          <div key={n} className={`shadow-cell shadow-${n}`}>sh-{n}</div>
        ))}
      </div>
    </div>
  );
}

function DSMotion() {
  return (
    <div className="ds-card full">
      <h3>Motion</h3>
      <div className="meta">fast 120 · base 220 · slow 340 · ease cubic(.22, 1, .36, 1)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[["fast", 120], ["base", 220], ["slow", 340]].map(([n, ms]) => (
          <div key={n} style={{ padding: 16, background: "var(--surface-2)", borderRadius: "var(--r-lg)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)", marginBottom: 8 }}>{n} · {ms}ms</div>
            <MotionDemo dur={ms} />
          </div>
        ))}
      </div>
    </div>
  );
}
function MotionDemo({ dur }) {
  const [on, setOn] = useState(false);
  React.useEffect(() => {
    const id = setInterval(() => setOn(o => !o), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ height: 32, background: "var(--surface)", borderRadius: "var(--r-md)", padding: 4, position: "relative", border: "1px solid var(--border)" }}>
      <div style={{ width: 24, height: 24, background: "var(--brand)", borderRadius: "var(--r-sm)", transition: `transform ${dur}ms cubic-bezier(.22,1,.36,1)`, transform: `translateX(${on ? "calc(100% + 8px)" : "0"})` }} />
    </div>
  );
}

function DSButtons() {
  return (
    <div className="ds-card wide">
      <h3>Buttons</h3>
      <div className="meta">primary · soft · secondary · ghost · outline · danger · 5 sizes</div>
      <div className="play"><Btn>Зберегти</Btn><Btn variant="soft">Надіслати</Btn><Btn variant="secondary">Скасувати</Btn><Btn variant="ghost">Пропустити</Btn><Btn variant="outline">Деталі</Btn><Btn variant="danger">Видалити</Btn></div>
      <div className="play"><Btn size="sm">sm</Btn><Btn size="md">md</Btn><Btn size="lg">lg</Btn><Btn size="xl">xl · повноекранна CTA на mobile <I.arrow /></Btn></div>
      <div className="play"><Btn disabled>Disabled</Btn><Btn variant="primary"><I.plus /> З іконкою</Btn><Btn variant="soft"><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Завантаження…</Btn></div>
    </div>
  );
}

function DSInputs() {
  const [pw, setPw] = useState("Hello1");
  const [show, setShow] = useState(false);
  const score = pwScore(pw);
  return (
    <div className="ds-card wide">
      <h3>Inputs</h3>
      <div className="meta">text · password · number · select trigger</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Email" help="Ми не передаємо третім особам">
          <input className="input" placeholder="hi@koshyk.app" defaultValue="anna@gmail.com" />
        </Field>
        <Field label="Сума" help="UAH">
          <div className="numinput">
            <span className="prefix">₴</span>
            <button>−</button>
            <input defaultValue="12 500,00" />
            <button>+</button>
          </div>
        </Field>
        <Field label="Пароль" error={score < 2 ? "Слабкий пароль" : null}>
          <div style={{ position: "relative" }}>
            <input className={`input ${score < 2 ? "invalid" : ""}`} type={show ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} style={{ paddingRight: 38 }} />
            <button className="icon-btn" type="button" onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 2, top: 2 }}><I.eye /></button>
          </div>
          <div className={`pwbar s${score}`}><span className="pwbar-seg" /><span className="pwbar-seg" /><span className="pwbar-seg" /><span className="pwbar-seg" /></div>
        </Field>
        <Field label="Гаманець">
          <button className="input" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", cursor: "pointer" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 16 }}>💳</span> Monobank · UAH</span>
            <I.caret />
          </button>
        </Field>
      </div>
    </div>
  );
}
function pwScore(s) {
  let n = 0;
  if (s.length >= 6) n++;
  if (s.length >= 10) n++;
  if (/[A-Z]/.test(s) && /[0-9]/.test(s)) n++;
  if (/[^A-Za-z0-9]/.test(s)) n++;
  return Math.max(1, n);
}

function DSToggles() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [tab, setTab] = useState("all");
  const [seg, setSeg] = useState("expense");
  return (
    <div className="ds-card wide">
      <h3>Toggles, tabs, chips</h3>
      <div className="meta">switch · segmented · tabs · chips · badges</div>
      <div className="play">
        <span className="muted tiny">Switch:</span>
        <Sw checked={a} onChange={setA} />
        <Sw checked={b} onChange={setB} />
        <Sw checked={a} onChange={setA} size="sm" />
      </div>
      <div className="play" style={{ marginTop: 8 }}>
        <span className="muted tiny">Segmented:</span>
        <div className="seg">
          {["expense","income","transfer"].map(k => (
            <div key={k} className={`seg-item ${seg === k ? "active" : ""}`} onClick={() => setSeg(k)}>{k === "expense" ? "Витрата" : k === "income" ? "Дохід" : "Переказ"}</div>
          ))}
        </div>
      </div>
      <div className="play" style={{ marginTop: 8 }}>
        <span className="muted tiny">Tabs:</span>
        <div className="tabs pill">
          {["all","unread"].map(k => (
            <div key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{k === "all" ? "Усі" : "Непрочитані"} {k === "unread" && <span className="badge brand" style={{ marginLeft: 6 }}>3</span>}</div>
          ))}
        </div>
      </div>
      <div className="play" style={{ marginTop: 8 }}>
        <span className="muted tiny">Chips:</span>
        <span className="chip active"><I.filter /> Цей місяць</span>
        <span className="chip">Витрата</span>
        <span className="chip">Monobank</span>
        <span className="chip active">#подорож <I.x /></span>
      </div>
      <div className="play" style={{ marginTop: 8 }}>
        <span className="muted tiny">Badges:</span>
        <span className="badge success"><I.check /> Synced</span>
        <span className="badge warning">80%</span>
        <span className="badge danger">Over</span>
        <span className="badge brand">New</span>
      </div>
    </div>
  );
}

function DSProgress() {
  return (
    <div className="ds-card">
      <h3>Progress rings</h3>
      <div className="meta">budgets · goals</div>
      <div className="play" style={{ justifyContent: "space-between" }}>
        <Ring pct={32} />
        <Ring pct={68} />
        <Ring pct={92} />
        <Ring pct={100} label="✓" />
      </div>
    </div>
  );
}

function DSAvatar() {
  return (
    <div className="ds-card">
      <h3>Avatars · spinners</h3>
      <div className="meta">initials · ring · 3 sizes</div>
      <div className="play">
        <span className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>АК</span>
        <span className="avatar">АК</span>
        <span className="avatar ring" style={{ width: 56, height: 56, fontSize: 18 }}>АК</span>
        <span className="spinner" />
        <span className="spinner lg" />
      </div>
    </div>
  );
}

function DSSheet() {
  return (
    <div className="ds-card">
      <h3>Bottom sheet</h3>
      <div className="meta">drag-handle · snap · keyboard-aware</div>
      <div style={{ background: "var(--surface-3)", padding: "20px 8px 0", borderRadius: "var(--r-lg)" }}>
        <div className="sheet-mock">
          <div className="sheet-handle" />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Нова транзакція</div>
          <div className="seg" style={{ width: "100%", marginBottom: 12 }}>
            <div className="seg-item active grow" style={{ textAlign: "center" }}>Витрата</div>
            <div className="seg-item grow" style={{ textAlign: "center" }}>Дохід</div>
            <div className="seg-item grow" style={{ textAlign: "center" }}>Переказ</div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 36, fontWeight: 600, textAlign: "center", padding: "12px 0" }}>−280,00 <span className="muted" style={{ fontSize: 16 }}>₴</span></div>
        </div>
      </div>
    </div>
  );
}

function DSToasts() {
  return (
    <div className="ds-card">
      <h3>Toast</h3>
      <div className="meta">success · error · undo · auto-dismiss</div>
      <div className="col">
        <div className="toast success" style={{ position: "relative" }}>
          <span className="ico"><I.check /></span>
          <div className="grow"><div style={{ fontWeight: 500, fontSize: 13 }}>Збережено</div><div className="muted tiny">Транзакцію додано до Monobank</div></div>
          <button className="btn btn-sm btn-ghost">Скасувати</button>
          <span className="toast-progress" />
        </div>
        <div className="toast error">
          <span className="ico"><I.x /></span>
          <div className="grow"><div style={{ fontWeight: 500, fontSize: 13 }}>Не вдалося синхронізувати</div><div className="muted tiny">Перевір підключення</div></div>
          <button className="btn btn-sm btn-ghost">Ще раз</button>
        </div>
      </div>
    </div>
  );
}

function DSCalendar() {
  return (
    <div className="ds-card">
      <h3>Date field</h3>
      <div className="meta">popup desktop · sheet mobile · uk locale</div>
      <div className="cal">
        {["Пн","Вт","Ср","Чт","Пт","Сб","Нд"].map(d => <div key={d} className="cal-head">{d}</div>)}
        {[27,28,29,30,1,2,3].map(d => <div key={"a"+d} className="cal-day muted">{d}</div>)}
        {Array.from({ length: 21 }, (_, i) => i + 4).map(d => (
          <div key={d} className={`cal-day ${d === 14 ? "today" : ""} ${d === 18 ? "sel" : ""}`}>{d}</div>
        ))}
        {[25,26,27,28,29,30,31].map(d => <div key={"b"+d} className="cal-day">{d}</div>)}
      </div>
    </div>
  );
}

function DSEmpty() {
  return (
    <div className="ds-card">
      <h3>Empty state</h3>
      <div className="meta">illo · title · CTA</div>
      <div className="empty">
        <div className="empty-illo"><I.target /></div>
        <h4>Ще немає цілей</h4>
        <p>Постав ціль — і кожна гривня матиме сенс</p>
        <Btn variant="primary" size="md"><I.plus /> Нова ціль</Btn>
      </div>
    </div>
  );
}

function DSMenu() {
  return (
    <div className="ds-card">
      <h3>Dropdown menu</h3>
      <div className="meta">replaces ad-hoc menus</div>
      <div className="menu">
        <div className="menu-item"><I.eye /> Переглянути</div>
        <div className="menu-item"><I.plus /> Дублювати</div>
        <div className="menu-item">Архівувати</div>
        <div className="menu-sep" />
        <div className="menu-item danger"><I.trash /> Видалити</div>
      </div>
    </div>
  );
}

function DSSkeleton() {
  return (
    <div className="ds-card">
      <h3>Skeletons</h3>
      <div className="meta">shimmer · 5 variants</div>
      <div className="col">
        <div className="row"><div className="skel" style={{ width: 40, height: 40, borderRadius: "var(--r-full)" }} /><div className="grow col" style={{ gap: 6 }}><div className="skel" style={{ height: 12, width: "60%" }} /><div className="skel" style={{ height: 10, width: "40%" }} /></div></div>
        <div className="skel" style={{ height: 14, width: "90%" }} />
        <div className="skel" style={{ height: 14, width: "70%" }} />
        <div className="skel" style={{ height: 80, borderRadius: "var(--r-lg)" }} />
      </div>
    </div>
  );
}

function DesignSystem() {
  return (
    <div className="canvas-section">
      <p className="sec-eyebrow">01 — Foundation</p>
      <h2 className="sec-title">Дизайн-система Koshyk v2</h2>
      <p className="sec-subtitle">Семантичні токени, типографічна шкала, радіуси, тіні, motion. Кожен компонент із шапки brief'у — у правому стовпчику. Замість <code style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>bg-emerald-500</code> / <code style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>bg-accent</code> — єдиний словник CSS-перемінних.</p>
      <div className="ds-grid">
        <DSColors />
        <DSType />
        <DSRadii />
        <DSShadows />
        <DSMotion />
        <DSButtons />
        <DSInputs />
        <DSToggles />
        <DSProgress />
        <DSAvatar />
        <DSSheet />
        <DSToasts />
        <DSCalendar />
        <DSEmpty />
        <DSMenu />
        <DSSkeleton />
      </div>
    </div>
  );
}

window.DesignSystem = DesignSystem;
