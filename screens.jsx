/* App screens: Dashboard, Transactions, TxSheet, Budgets, Goals
   Each rendered inside an iOS frame for fidelity. */
const { useState: useSc } = React;

const fmt = (n) => new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n).replace(/\u00A0/g, " ");

/* ---------- Shared row used in Dashboard / Transactions / Goals ---------- */
function TxRow({ emoji, title, subtitle, amount, time, positive, isFirst, padding = "12px 14px" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding, borderTop: isFirst ? "none" : "1px solid var(--border)" }}>
      <div aria-hidden="true" style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
        <div className="muted" style={{ fontSize: 11 }}>{subtitle}</div>
      </div>
      <div style={time ? { textAlign: "right" } : undefined}>
        <div className="tabular" style={{ fontWeight: 600, fontSize: 14, color: positive ? "var(--success)" : "var(--text)" }}>{amount} \u20B4</div>
        {time && <div className="muted tabular" style={{ fontSize: 10 }}>{time}</div>}
      </div>
    </div>
  );
}

/* ---------- Empty state helper ---------- */
function EmptyState({ icon, title, body, cta }) {
  return (
    <div style={{ padding: "60px 28px", textAlign: "center" }}>
      <div aria-hidden="true" style={{ width: 72, height: 72, borderRadius: "var(--r-2xl)", background: "var(--brand-soft)", color: "var(--brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 16 }}>{icon}</div>
      <div className="font-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div className="muted" style={{ fontSize: 13, lineHeight: 1.5, maxWidth: 260, margin: "0 auto 16px" }}>{body}</div>
      {cta && <button type="button" className="btn btn-md btn-primary"><Icons.plus /> {cta}</button>}
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard() {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)", color: "var(--text)" }}>
      <div style={{ padding: "12px 16px 4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="muted" style={{ fontSize: 12 }}>Привіт, Анно ✦</div>
          <div className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>Листопад · 2026</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button type="button" className="icon-btn" aria-label="Пошук"><Icons.search /></button>
          <button type="button" className="icon-btn" aria-label="Сповіщення (1 нове)" style={{ position: "relative" }}>
            <Icons.bell />
            <span aria-hidden="true" style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 999, background: "var(--brand)", border: "2px solid var(--surface)" }} />
          </button>
        </div>
      </div>

      {/* Hero balance card */}
      <div style={{ margin: "8px 16px 16px", padding: "20px", borderRadius: "var(--r-2xl)", background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)", color: "white", boxShadow: "var(--sh-brand)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.2), transparent 50%)" }} />
        <div style={{ fontSize: 12, opacity: 0.85, position: "relative" }}>Чисті активи</div>
        <div className="font-display tabular" style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.02em", margin: "4px 0 6px", position: "relative" }}>42 580,50 <span style={{ fontSize: 18, opacity: 0.7, fontWeight: 500 }}>₴</span></div>
        <div style={{ display: "flex", gap: 14, fontSize: 12, opacity: 0.9, position: "relative" }}>
          <span>↑ +5,2% за місяць</span>
          <span>·</span>
          <span>3 рахунки</span>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ padding: 14, borderRadius: "var(--r-lg)", background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="muted" style={{ fontSize: 11 }}>Витрачено</div>
          <div className="tabular" style={{ fontWeight: 600, fontSize: 18, marginTop: 2 }}>8 240 ₴</div>
          <div style={{ fontSize: 10, color: "var(--text-subtle)", marginTop: 2 }}>з 12 000 ₴</div>
        </div>
        <div style={{ padding: 14, borderRadius: "var(--r-lg)", background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="muted" style={{ fontSize: 11 }}>Заробив</div>
          <div className="tabular" style={{ fontWeight: 600, fontSize: 18, marginTop: 2, color: "var(--success)" }}>+25 000 ₴</div>
          <div style={{ fontSize: 10, color: "var(--text-subtle)", marginTop: 2 }}>2 надходження</div>
        </div>
      </div>

      {/* Budget rings */}
      <div style={{ padding: "20px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="font-display" style={{ fontWeight: 600, fontSize: 15 }}>Бюджети</div>
        <span className="muted" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 2 }}>Усі <Icons.chevR /></span>
      </div>
      <div style={{ display: "flex", gap: 10, padding: "0 16px 8px", overflow: "auto" }}>
        {[["Їжа","🍔",62,"var(--brand)"],["Транспорт","🚗",28,"var(--success)"],["Розваги","🎬",92,"var(--warning)"],["Одяг","👕",100,"var(--danger)"]].map(([n,e,p,c]) => (
          <div key={n} style={{ flex: "0 0 110px", padding: 12, borderRadius: "var(--r-lg)", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ position: "relative" }}>
              <Ring pct={p} size={56} stroke={5} label={<span style={{ fontSize: 18 }}>{e}</span>} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 500 }}>{n}</div>
            <div className="tabular" style={{ fontSize: 10, color: c }}>{p}%</div>
          </div>
        ))}
      </div>

      {/* Recent tx */}
      <div style={{ padding: "16px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="font-display" style={{ fontWeight: 600, fontSize: 15 }}>Останні</div>
        <span className="muted" style={{ fontSize: 12 }}>Сьогодні</span>
      </div>
      <div style={{ padding: "0 16px 100px" }}>
        {[
          ["🍔","Сільпо","Їжа","−280,00","14:32"],
          ["🚗","Bolt","Транспорт","−110,00","12:18"],
          ["☕","Aroma Kava","Кафе","−85,00","09:50"],
          ["💼","ТОВ Альфа","Зарплата","+25 000,00","09:00", true],
          ["📱","Київстар","Звʼязок","−180,00","Вчора"],
        ].map((t, i) => (
          <TxRow
            key={`${t[0]}-${t[1]}-${t[3]}`}
            emoji={t[0]} title={t[1]}
            subtitle={`${t[2]} · ${t[4]}`}
            amount={t[3]} positive={!!t[5]}
            isFirst={i === 0} padding="12px 8px"
          />
        ))}
      </div>

      <BottomNav active="home" />
      <Fab />
    </div>
  );
}

function BottomNav({ active }) {
  const items = [
    { k: "home", L: "Огляд", I: Icons.home },
    { k: "tx", L: "Операції", I: Icons.list },
    { k: "fab", L: "", I: null },
    { k: "budget", L: "Бюджети", I: Icons.pig },
    { k: "more", L: "Ще", I: Icons.more },
  ];
  return (
    <nav role="navigation" aria-label="Основна навігація" style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "color-mix(in oklch, var(--surface) 80%, transparent)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", padding: "8px 8px 22px", display: "flex", justifyContent: "space-around" }}>
      {items.map(it => it.k === "fab" ? <div key="fab" aria-hidden="true" style={{ width: 56 }} /> : (
        <button key={it.k} type="button" className="icon-btn" aria-label={it.L} aria-current={active === it.k ? "page" : undefined} style={{ flexDirection: "column", height: "auto", gap: 2, padding: "6px 8px", color: active === it.k ? "var(--brand)" : "var(--text-subtle)" }}>
          <it.I />
          <span aria-hidden="true" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>{it.L}</span>
        </button>
      ))}
    </nav>
  );
}
function Fab() {
  return (
    <button type="button" aria-label="Додати операцію" style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", width: 56, height: 56, borderRadius: "var(--r-full)", background: "var(--brand)", color: "var(--on-brand)", border: "4px solid var(--bg)", boxShadow: "var(--sh-brand)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      <Icons.plus />
    </button>
  );
}

/* ---------- Transactions list ---------- */
function Transactions() {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ position: "sticky", top: 0, background: "color-mix(in oklch, var(--bg) 85%, transparent)", backdropFilter: "blur(12px)", padding: "10px 16px 12px", zIndex: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Операції</div>
          <button type="button" className="icon-btn" aria-label="Пошук операцій"><Icons.search /></button>
        </div>
        <div style={{ display: "flex", gap: 6, overflow: "auto", marginBottom: 8 }}>
          <span className="chip active"><Icons.filter /> Листопад</span>
          <span className="chip">Усі рахунки</span>
          <span className="chip">Усі категорії</span>
        </div>
        <div className="seg" role="radiogroup" aria-label="Тип операцій" style={{ width: "100%" }}>
          <button type="button" role="radio" aria-checked="true" className="seg-item active grow">Усі</button>
          <button type="button" role="radio" aria-checked="false" className="seg-item grow">Витрати</button>
          <button type="button" role="radio" aria-checked="false" className="seg-item grow">Доходи</button>
        </div>
      </div>

      {[
        ["Сьогодні · 14 листопада","8 240 ₴", [
          ["🍔","Сільпо","Продукти","−480,50","14:32","Monobank"],
          ["🚗","Bolt","Транспорт","−110,00","12:18","Privat"],
          ["☕","Aroma Kava","Кафе","−85,00","09:50","Monobank"],
        ]],
        ["Вчора · 13 листопада","1 120 ₴", [
          ["📱","Київстар","Звʼязок","−180,00","18:30","Monobank"],
          ["🛒","АТБ","Продукти","−640,00","17:12","Monobank"],
          ["⛽","WOG","Авто","−300,00","08:45","Privat"],
        ]],
        ["12 листопада","+25 000 ₴", [
          ["💼","ТОВ Альфа","Зарплата","+25 000,00","09:00","Monobank", true],
        ]],
      ].map(([day, sum, rows]) => (
        <div key={day} style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px 6px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <span>{day}</span><span className="tabular">{sum}</span>
          </div>
          <div style={{ background: "var(--surface)", margin: "0 12px", borderRadius: "var(--r-lg)", border: "1px solid var(--border)" }}>
            {rows.map((t, j) => (
              <TxRow
                key={`${t[0]}-${t[1]}-${t[3]}`}
                emoji={t[0]} title={t[1]}
                subtitle={`${t[2]} · ${t[5]}`}
                amount={t[3]} time={t[4]} positive={!!t[6]}
                isFirst={j === 0}
              />
            ))}
          </div>
        </div>
      ))}
      <div style={{ height: 100 }} />
      <BottomNav active="tx" />
      <Fab />
    </div>
  );
}

/* ---------- Transactions — search-active variant ---------- */
function TransactionsSearch() {
  const matches = [
    ["🍔","Сільпо","Продукти","−480,50","14:32","Monobank"],
    ["🛒","Сільпо","Продукти","−1 240,00","Вчора","Monobank"],
    ["🥐","Сільпо · кафе","Кафе","−215,00","11 лист","Privat"],
  ];
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ position: "sticky", top: 0, background: "color-mix(in oklch, var(--bg) 85%, transparent)", backdropFilter: "blur(12px)", padding: "10px 12px 12px", zIndex: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)", display: "flex" }}><Icons.search /></span>
            <input className="input" type="search" defaultValue="Сільпо" aria-label="Пошук операцій" style={{ paddingLeft: 36, paddingRight: 36 }} />
            <button type="button" aria-label="Очистити" style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 24, height: 24, borderRadius: 999, background: "var(--surface-3)", color: "var(--text-muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Icons.x /></button>
          </div>
          <button type="button" className="btn btn-sm btn-ghost">Скасувати</button>
        </div>
        <div style={{ display: "flex", gap: 6, overflow: "auto", marginTop: 10 }}>
          <span className="chip active"><Icons.filter /> Сільпо</span>
          <span className="chip">Продукти</span>
          <span className="chip">Усі рахунки</span>
          <span className="chip">Листопад</span>
        </div>
      </div>

      <div style={{ padding: "12px 16px 6px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", justifyContent: "space-between" }}>
        <span>3 збіги · Листопад</span>
        <span className="tabular">−1 935,50 ₴</span>
      </div>
      <div style={{ background: "var(--surface)", margin: "0 12px", borderRadius: "var(--r-lg)", border: "1px solid var(--border)" }}>
        {matches.map((t, j) => (
          <TxRow
            key={`${t[0]}-${t[1]}-${t[3]}`}
            emoji={t[0]} title={<HighlightSilpo text={t[1]} />}
            subtitle={`${t[2]} · ${t[5]}`}
            amount={t[3]} time={t[4]}
            isFirst={j === 0}
          />
        ))}
      </div>
      <div style={{ height: 100 }} />
      <BottomNav active="tx" />
    </div>
  );
}

function HighlightSilpo({ text }) {
  const idx = text.toLowerCase().indexOf("сільпо");
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "var(--brand-soft)", color: "var(--brand)", borderRadius: 3, padding: "0 2px" }}>{text.slice(idx, idx + 6)}</mark>
      {text.slice(idx + 6)}
    </>
  );
}

/* ---------- Reusable bottom sheet wrapper ---------- */
function Sheet({ behind, title, leading, trailing, children, footer }) {
  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      {behind && (
        <div style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}>{behind}</div>
      )}
      <div style={{ position: "absolute", inset: 0, background: "color-mix(in oklch, black 50%, transparent)", pointerEvents: "none" }} />
      <div role="dialog" aria-modal="true" aria-label={title} style={{ position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: "92%", overflowY: "auto", background: "var(--surface)", borderRadius: "var(--r-3xl) var(--r-3xl) 0 0", padding: "10px 20px 32px", boxShadow: "var(--sh-5)" }}>
        <div aria-hidden="true" style={{ width: 40, height: 4, borderRadius: 4, background: "var(--border-strong)", margin: "0 auto 16px" }} />
        {(leading || title || trailing) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ minWidth: 70 }}>{leading}</div>
            <div className="font-display" style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
            <div style={{ minWidth: 70, textAlign: "right" }}>{trailing}</div>
          </div>
        )}
        {children}
        {footer && <div style={{ marginTop: 20 }}>{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Add Transaction sheet ---------- */
function TxSheet() {
  const [type, setType] = useSc("expense");
  const [cat, setCat] = useSc("food");
  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      {/* dim header glimpse */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}>
        <Dashboard />
      </div>
      {/* dim layer over the dashboard */}
      <div style={{ position: "absolute", inset: 0, background: "color-mix(in oklch, black 50%, transparent)", pointerEvents: "none" }} />
      {/* sheet pinned to the bottom */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: "92%", overflowY: "auto", background: "var(--surface)", borderRadius: "var(--r-3xl) var(--r-3xl) 0 0", padding: "10px 20px 40px", boxShadow: "var(--sh-5)" }}>
        <div style={{ width: 40, height: 4, borderRadius: 4, background: "var(--border-strong)", margin: "0 auto 16px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button className="btn btn-sm btn-ghost">Скасувати</button>
          <div className="font-display" style={{ fontSize: 16, fontWeight: 600 }}>Нова операція</div>
          <button className="btn btn-sm btn-soft">Готово</button>
        </div>

        <div className="seg" role="radiogroup" aria-label="Тип операції" style={{ width: "100%", marginBottom: 16 }}>
          {[["expense","Витрата"],["income","Дохід"],["transfer","Переказ"]].map(([k,L]) => (
            <button key={k} type="button" role="radio" aria-checked={type === k} className={`seg-item grow ${type === k ? "active" : ""}`} onClick={() => setType(k)}>{L}</button>
          ))}
        </div>

        {/* Amount */}
        <div style={{ textAlign: "center", padding: "12px 0 8px" }}>
          <div className="font-display tabular" style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", color: type === "income" ? "var(--success)" : "var(--text)" }}>
            {type === "income" ? "+" : type === "expense" ? "−" : ""}280<span className="muted" style={{ fontSize: 28, fontWeight: 500 }}>,00 ₴</span>
          </div>
          <div className="muted tiny">≈ 6,80 €</div>
        </div>

        {/* Quick category */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 12 }}>
          {[["food","🍔","Їжа"],["car","🚗","Транспорт"],["coffee","☕","Кафе"],["home","🏠","Дім"],["fun","🎬","Розваги"]].map(([k,e,n]) => (
            <button key={k} onClick={() => setCat(k)} style={{ padding: "10px 4px", border: "1px solid", borderColor: cat === k ? "var(--brand)" : "var(--border)", borderRadius: "var(--r-lg)", background: cat === k ? "var(--brand-soft)" : "var(--surface)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", transition: "all 120ms" }}>
              <span style={{ fontSize: 22 }}>{e}</span>
              <span style={{ fontSize: 10, color: cat === k ? "var(--brand)" : "var(--text-muted)" }}>{n}</span>
            </button>
          ))}
        </div>

        {/* Form rows */}
        <div style={{ marginTop: 16, background: "var(--surface-2)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
          {[
            ["Гаманець","💳 Monobank · UAH"],
            ["Дата","Сьогодні, 14:32"],
            ["Валюта","UAH · ₴"],
            ["Повторення","Не повторюється"],
            ["Нотатка","Сільпо на Хрещатику"],
            ["Теги","#продукти"],
          ].map((r, i) => (
            <button type="button" key={r[0]} aria-label={`${r[0]}: ${r[1]}`} style={{ appearance: "none", background: "transparent", border: "none", textAlign: "left", width: "100%", display: "flex", alignItems: "center", padding: "14px 16px", borderTop: i ? "1px solid var(--border)" : "none", cursor: "pointer", color: "inherit" }}>
              <span className="muted" style={{ fontSize: 13, width: 90 }}>{r[0]}</span>
              <span style={{ fontSize: 14, flex: 1 }}>{r[1]}</span>
              <Icons.chevR style={{ color: "var(--text-subtle)" }} />
            </button>
          ))}
        </div>

        <button type="button" className="btn btn-xl btn-primary" style={{ marginTop: 20 }}>Зберегти</button>
      </div>
    </div>
  );
}

/* ---------- Budgets ---------- */
function Budgets() {
  const items = [
    ["🍔","Їжа",62,"7 440 ₴","12 000 ₴", "var(--success)"],
    ["🚗","Транспорт",28,"840 ₴","3 000 ₴", "var(--success)"],
    ["🎬","Розваги",92,"1 840 ₴","2 000 ₴", "var(--warning)"],
    ["👕","Одяг",110,"2 200 ₴","2 000 ₴", "var(--danger)"],
    ["🏠","Дім",45,"4 500 ₴","10 000 ₴", "var(--success)"],
    ["☕","Кафе",78,"780 ₴","1 000 ₴", "var(--warning)"],
  ];
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ padding: "12px 16px 8px" }}>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Бюджети</div>
        <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>Листопад · 30 днів</div>
      </div>

      {/* Summary card */}
      <div style={{ margin: "12px 16px", padding: 18, borderRadius: "var(--r-2xl)", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
        <Ring pct={68} size={88} stroke={9} />
        <div style={{ flex: 1 }}>
          <div className="muted" style={{ fontSize: 12 }}>Витрачено разом</div>
          <div className="font-display tabular" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>20 800 ₴</div>
          <div className="muted tabular" style={{ fontSize: 11, marginTop: 2 }}>з 30 000 ₴ · залишилось 9 200 ₴</div>
        </div>
      </div>

      {/* Period selector */}
      <div style={{ padding: "0 16px 8px" }}>
        <div className="seg" role="radiogroup" aria-label="Період" style={{ width: "100%" }}>
          <button type="button" role="radio" aria-checked="false" className="seg-item grow">Тиждень</button>
          <button type="button" role="radio" aria-checked="true" className="seg-item active grow">Місяць</button>
          <button type="button" role="radio" aria-checked="false" className="seg-item grow">Рік</button>
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: "8px 12px 100px" }}>
        {items.map((it) => (
          <div key={it[1]} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: "var(--r-md)", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{it[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{it[1]}</span>
                <span className="tabular" style={{ fontSize: 12, fontWeight: 600, color: it[5] }}>{it[2]}%</span>
              </div>
              <div style={{ height: 6, background: "var(--surface-3)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min(it[2], 100)}%`, background: it[5], transition: "width 340ms" }} />
              </div>
              <div className="muted tabular" style={{ fontSize: 11, marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                <span>{it[3]} витрачено</span>
                <span>{it[4]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="budget" />
      <Fab />
    </div>
  );
}

/* ---------- Goals ---------- */
function Goals() {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ padding: "12px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Цілі</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>3 активні · 1 завершена</div>
        </div>
        <button className="btn btn-sm btn-soft"><Icons.plus /> Нова</button>
      </div>

      {/* Featured goal */}
      <div style={{ margin: "12px 16px", padding: 24, borderRadius: "var(--r-2xl)", background: "linear-gradient(135deg, var(--brand-soft) 0%, var(--brand-soft-2) 100%)", border: "1px solid var(--border)", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>✈️</div>
        <div className="font-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Відпустка в Грузії</div>
        <Ring pct={68} size={140} stroke={11} label={<><span className="tabular" style={{ fontSize: 24, fontWeight: 700 }}>68%</span></>} />
        <div className="font-display tabular" style={{ marginTop: 12, fontSize: 16, fontWeight: 600 }}>34 000 <span className="muted" style={{ fontWeight: 400 }}>з</span> 50 000 ₴</div>
        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>Залишилось 16 000 ₴ · до 15 січня</div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button className="btn btn-md btn-secondary grow">Деталі</button>
          <button className="btn btn-md btn-primary grow">Поповнити</button>
        </div>
      </div>

      {/* Other goals */}
      <div style={{ padding: "0 16px 8px" }}>
        <div className="muted" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Інші цілі</div>
      </div>
      <div style={{ padding: "0 12px 100px" }}>
        {[["💻","Новий MacBook",42,"42 000 ₴","100 000 ₴","var(--brand)"],["🚗","Перший внесок на авто",18,"18 000 ₴","100 000 ₴","var(--info)"],["🎓","Курс англійської",100,"12 000 ₴","12 000 ₴","var(--success)"]].map((g) => (
          <div key={g[1]} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 14 }}>
            <Ring pct={g[2]} size={56} stroke={5} label={<span style={{ fontSize: 18 }}>{g[0]}</span>} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{g[1]}</span>
                {g[2] === 100 && <span className="badge success"><Icons.check /> Done</span>}
              </div>
              <div className="muted tabular" style={{ fontSize: 11, marginTop: 4 }}>{g[3]} з {g[4]}</div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="more" />
      <Fab />
    </div>
  );
}

/* ---------- Empty-state variants ---------- */
function TransactionsEmpty() {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ padding: "12px 16px 8px" }}>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Операції</div>
      </div>
      <EmptyState
        icon="🧾"
        title="Поки що порожньо"
        body="Додай першу операцію — і ми почнемо рахувати твої витрати, доходи та залишки."
        cta="Додати операцію"
      />
      <BottomNav active="tx" />
      <Fab />
    </div>
  );
}

function BudgetsEmpty() {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ padding: "12px 16px 8px" }}>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Бюджети</div>
        <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>Листопад · 30 днів</div>
      </div>
      <EmptyState
        icon="🪙"
        title="Створи свій перший бюджет"
        body="Постав ліміт на категорію — Кошик нагадає, коли наближаєшся до межі."
        cta="Новий бюджет"
      />
      <BottomNav active="budget" />
      <Fab />
    </div>
  );
}

function GoalsEmpty() {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ padding: "12px 16px 8px" }}>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Цілі</div>
      </div>
      <EmptyState
        icon="✨"
        title="Мрії починаються з цілей"
        body="Відпустка, новий ноут, перший внесок — обери ціль і відкладай по-трохи щомісяця."
        cta="Нова ціль"
      />
      <BottomNav active="more" />
      <Fab />
    </div>
  );
}

/* ---------- Currency picker ---------- */
function CurrencyPicker() {
  const rates = [
    ["UAH","Українська гривня","₴", null, true],
    ["USD","Долар США","$","41,28"],
    ["EUR","Євро","€","43,56"],
    ["PLN","Польський злотий","zł","10,12"],
    ["GBP","Британський фунт","£","52,01"],
    ["CHF","Швейцарський франк","CHF","46,18"],
    ["GEL","Грузинський ларі","₾","15,22"],
    ["CZK","Чеська крона","Kč","1,79"],
  ];
  return (
    <Sheet
      behind={<TxSheet />}
      title="Валюта"
      leading={<button type="button" className="btn btn-sm btn-ghost">Скасувати</button>}
      trailing={<button type="button" className="btn btn-sm btn-soft">Готово</button>}
    >
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span aria-hidden="true" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-subtle)", display: "flex" }}><Icons.search /></span>
        <input className="input" type="search" placeholder="Знайти валюту" aria-label="Пошук валюти" style={{ paddingLeft: 36 }} />
      </div>
      <div className="muted" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 4px 8px" }}>Курс НБУ · 14.11</div>
      <div style={{ background: "var(--surface-2)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
        {rates.map((c, i) => (
          <button key={c[0]} type="button" role="radio" aria-checked={!!c[4]} style={{ appearance: "none", background: c[4] ? "var(--brand-soft)" : "transparent", border: "none", textAlign: "left", width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderTop: i ? "1px solid var(--border)" : "none", cursor: "pointer", color: "inherit" }}>
            <span style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: c[4] ? "var(--brand)" : "var(--surface)", color: c[4] ? "var(--on-brand)" : "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontFamily: "var(--font-mono)" }}>{c[2]}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>{c[0]} <span className="muted" style={{ fontSize: 12, fontWeight: 400 }}>· {c[1]}</span></div>
              {c[3] && <div className="muted tabular" style={{ fontSize: 11 }}>1 {c[0]} = {c[3]} ₴</div>}
              {c[4] && <div className="tabular" style={{ fontSize: 11, color: "var(--brand)" }}>За замовчуванням</div>}
            </div>
            {c[4] && <Icons.check style={{ color: "var(--brand)" }} />}
          </button>
        ))}
      </div>
    </Sheet>
  );
}

/* ---------- Wallet picker ---------- */
function WalletPicker() {
  const wallets = [
    ["💳","Monobank","UAH","32 480,50","var(--brand)", true],
    ["🏦","Privat","UAH","8 100,00","var(--info)"],
    ["💵","Готівка","UAH","2 000,00","var(--success)"],
    ["💸","Wise","EUR","420,18","var(--warning)"],
  ];
  return (
    <Sheet
      behind={<Dashboard />}
      title="Гаманець"
      leading={<button type="button" className="btn btn-sm btn-ghost">Скасувати</button>}
      trailing={<button type="button" className="btn btn-sm btn-soft">Готово</button>}
    >
      <div style={{ background: "var(--surface-2)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
        {wallets.map((w, i) => (
          <button key={w[1]} type="button" role="radio" aria-checked={!!w[5]} style={{ appearance: "none", background: w[5] ? "var(--brand-soft)" : "transparent", border: "none", textAlign: "left", width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderTop: i ? "1px solid var(--border)" : "none", cursor: "pointer", color: "inherit" }}>
            <span aria-hidden="true" style={{ width: 40, height: 40, borderRadius: "var(--r-md)", background: w[4], color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{w[0]}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{w[1]} <span className="muted" style={{ fontWeight: 400 }}>· {w[2]}</span></div>
              <div className="muted tabular" style={{ fontSize: 11 }}>{w[3]} {w[2] === "EUR" ? "€" : "₴"}</div>
            </div>
            {w[5] && <Icons.check style={{ color: "var(--brand)" }} />}
          </button>
        ))}
      </div>
      <button type="button" className="btn btn-md btn-ghost" style={{ width: "100%", marginTop: 12 }}><Icons.plus /> Додати рахунок</button>
    </Sheet>
  );
}

/* ---------- Date picker ---------- */
function DatePicker() {
  const week = ["Пн","Вт","Ср","Чт","Пт","Сб","Нд"];
  const days = Array.from({ length: 35 }, (_, i) => i - 5);
  return (
    <Sheet
      behind={<TxSheet />}
      title="Дата"
      leading={<button type="button" className="btn btn-sm btn-ghost">Скасувати</button>}
      trailing={<button type="button" className="btn btn-sm btn-soft">Готово</button>}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px 12px" }}>
        <button type="button" className="icon-btn" aria-label="Попередній місяць" style={{ transform: "rotate(180deg)" }}><Icons.chevR /></button>
        <span className="font-display" style={{ fontWeight: 600 }}>Листопад 2026</span>
        <button type="button" className="icon-btn" aria-label="Наступний місяць"><Icons.chevR /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {week.map(d => <div key={d} className="muted" style={{ textAlign: "center", fontSize: 11, fontFamily: "var(--font-mono)", padding: "4px 0" }}>{d}</div>)}
        {days.map((d) => {
          const inMonth = d > 0 && d <= 30;
          const isSelected = d === 14;
          const isToday = d === 14;
          return (
            <button key={`d${d}`} type="button" disabled={!inMonth} aria-pressed={isSelected} style={{ aspectRatio: "1", appearance: "none", background: isSelected ? "var(--brand)" : isToday ? "var(--brand-soft)" : "transparent", color: isSelected ? "var(--on-brand)" : !inMonth ? "var(--text-subtle)" : "var(--text)", border: "none", borderRadius: "var(--r-md)", fontSize: 14, fontWeight: isToday ? 600 : 400, cursor: inMonth ? "pointer" : "default", opacity: !inMonth ? 0.35 : 1, fontFamily: "var(--font-mono)" }}>
              {inMonth ? d : d <= 0 ? 31 + d : d - 30}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--surface-2)", borderRadius: "var(--r-lg)", display: "flex", alignItems: "center", gap: 8 }}>
        <span className="muted" style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}>ЧАС</span>
        <span className="tabular" style={{ flex: 1, fontWeight: 600 }}>14:32</span>
        <button type="button" className="btn btn-sm btn-ghost">Зараз</button>
      </div>
    </Sheet>
  );
}

/* ---------- Notifications ---------- */
function Notifications() {
  const groups = [
    ["Сьогодні", [
      ["⚠️", "Бюджет «Розваги» — 92%", "Залишилось 160 ₴ до кінця місяця.", "14:02", "warning", true],
      ["🎯", "Ціль «Відпустка» — +2 000 ₴", "Поповнено вручну. До цілі 16 000 ₴.", "09:14", "brand", true],
    ]],
    ["Вчора", [
      ["💼", "Зарплата надійшла", "+25 000 ₴ на Monobank · UAH.", "09:00", "success"],
      ["🔁", "Київстар · автосписання", "−180 ₴ за тарифний план.", "18:30", "info"],
    ]],
    ["Цього тижня", [
      ["🎉", "100% цілі «Курс англійської»", "Ціль закрита! Цього вистачить на 4 місяці курсу.", "Пн", "success"],
      ["🛡️", "Підозріла операція", "−4 200 ₴ у новому місці. Підтверди, якщо це ти.", "Нд", "danger"],
    ]],
  ];
  const tones = {
    warning: ["var(--warning-soft)", "var(--warning)"],
    brand:   ["var(--brand-soft)", "var(--brand)"],
    success: ["var(--success-soft)", "var(--success)"],
    info:    ["var(--surface-2)", "var(--info)"],
    danger:  ["var(--danger-soft)", "var(--danger)"],
  };
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--bg)" }}>
      <div style={{ position: "sticky", top: 0, background: "color-mix(in oklch, var(--bg) 85%, transparent)", backdropFilter: "blur(12px)", padding: "10px 16px 12px", zIndex: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Сповіщення</div>
        <button type="button" className="btn btn-sm btn-ghost">Прочитати всі</button>
      </div>
      {groups.map(([day, rows]) => (
        <div key={day}>
          <div className="muted" style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", padding: "12px 16px 6px" }}>{day}</div>
          <div style={{ background: "var(--surface)", margin: "0 12px 8px", borderRadius: "var(--r-lg)", border: "1px solid var(--border)" }}>
            {rows.map((n, j) => {
              const [bg, fg] = tones[n[4]] ?? tones.info;
              return (
                <div key={n[1]} style={{ display: "flex", gap: 12, padding: "14px 14px", borderTop: j ? "1px solid var(--border)" : "none", alignItems: "flex-start", position: "relative" }}>
                  <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{n[0]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{n[1]}</span>
                      <span className="muted tabular" style={{ fontSize: 11, flexShrink: 0 }}>{n[3]}</span>
                    </div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>{n[2]}</div>
                  </div>
                  {n[5] && <span aria-label="Не прочитано" style={{ position: "absolute", top: 18, right: 6, width: 8, height: 8, borderRadius: 999, background: "var(--brand)" }} />}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ height: 40 }} />
    </div>
  );
}

/* ---------- Onboarding (4 steps shown side-by-side) ---------- */
function OnboardingStep({ step, total, icon, title, body, primary, secondary, accent = "var(--brand)" }) {
  return (
    <div style={{ height: "100%", background: "var(--bg)", display: "flex", flexDirection: "column", padding: "60px 28px 28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div className="muted" style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}>{step}/{total}</div>
        <button type="button" className="btn btn-sm btn-ghost">Пропустити</button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div aria-hidden="true" style={{ width: 120, height: 120, borderRadius: "var(--r-3xl)", background: `linear-gradient(135deg, ${accent} 0%, var(--brand-deep) 100%)`, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, marginBottom: 32, boxShadow: "var(--sh-brand)" }}>{icon}</div>
        <h1 className="font-display" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 12px", lineHeight: 1.1 }}>{title}</h1>
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.5, maxWidth: 280, margin: 0 }}>{body}</p>
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 24 }} aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} style={{ width: i + 1 === step ? 24 : 6, height: 6, borderRadius: 999, background: i + 1 === step ? "var(--brand)" : "var(--border-strong)", transition: "width 220ms" }} />
        ))}
      </div>
      <button type="button" className="btn btn-xl btn-primary">{primary}</button>
      {secondary && <button type="button" className="btn btn-md btn-ghost" style={{ marginTop: 8 }}>{secondary}</button>}
    </div>
  );
}

const OnboardingWelcome = () => <OnboardingStep step={1} total={4} icon="👋" title="Привіт! Я — Кошик." body="Допомагаю стежити за грошима без надмірних дій. 30 секунд — і поїхали." primary="Почати" secondary="Уже маю акаунт" />;
const OnboardingAccounts = () => <OnboardingStep step={2} total={4} icon="🏦" title="Підключи рахунки" body="Monobank, Privat, готівка, картки в інших валютах. Все живе в одному списку." primary="Додати рахунок" secondary="Пропустити" />;
const OnboardingBudgets = () => <OnboardingStep step={3} total={4} icon="🎯" title="Постав бюджети" body="Виберемо ліміти на категорії — їжа, транспорт, кафе. Ми попередимо на 80%." primary="Налаштувати" secondary="Пізніше" />;
const OnboardingDone = () => <OnboardingStep step={4} total={4} icon="✨" title="Все готово!" body="Перша операція — і Кошик почне рахувати твій кешфлоу. Удачі!" primary="До дашборду" accent="var(--success)" />;

/* ---------- Export / Statement ---------- */
function ExportSheet() {
  return (
    <Sheet
      behind={<Transactions />}
      title="Виписка"
      leading={<button type="button" className="btn btn-sm btn-ghost">Скасувати</button>}
    >
      <div className="muted" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 4px 8px" }}>Період</div>
      <div className="seg" role="radiogroup" aria-label="Період" style={{ width: "100%", marginBottom: 12 }}>
        <button type="button" role="radio" aria-checked="false" className="seg-item grow">7 днів</button>
        <button type="button" role="radio" aria-checked="true" className="seg-item active grow">Місяць</button>
        <button type="button" role="radio" aria-checked="false" className="seg-item grow">Квартал</button>
        <button type="button" role="radio" aria-checked="false" className="seg-item grow">Свій</button>
      </div>

      <div className="muted" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "12px 4px 8px" }}>Формат</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          ["pdf", "PDF", "📄", "Для друку", true],
          ["csv", "CSV", "📊", "Для Excel"],
          ["json", "JSON", "🧩", "Для гіків"],
        ].map(f => (
          <button key={f[0]} type="button" role="radio" aria-checked={!!f[4]} style={{ appearance: "none", padding: 14, borderRadius: "var(--r-lg)", background: f[4] ? "var(--brand-soft)" : "var(--surface-2)", border: f[4] ? "1px solid var(--brand)" : "1px solid var(--border)", cursor: "pointer", textAlign: "center", color: "inherit", font: "inherit" }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{f[2]}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: f[4] ? "var(--brand)" : "var(--text)" }}>{f[1]}</div>
            <div className="muted" style={{ fontSize: 10, marginTop: 2 }}>{f[3]}</div>
          </button>
        ))}
      </div>

      <div className="muted" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "12px 4px 8px" }}>Що включити</div>
      <div style={{ background: "var(--surface-2)", borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: 16 }}>
        {[
          ["Усі рахунки","4 рахунки", true],
          ["Усі категорії","12 категорій", true],
          ["Тільки витрати","Без доходів", false],
          ["З нотатками й тегами","", true],
        ].map((row, i) => (
          <div key={row[0]} style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderTop: i ? "1px solid var(--border)" : "none", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{row[0]}</div>
              {row[1] && <div className="muted" style={{ fontSize: 11 }}>{row[1]}</div>}
            </div>
            <div className={`sw ${row[2] ? "on" : ""}`} role="switch" aria-checked={row[2]} aria-label={row[0]}><div className="thumb" /></div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 14px", background: "var(--brand-soft)", borderRadius: "var(--r-lg)", marginBottom: 16 }}>
        <span aria-hidden="true" style={{ fontSize: 22 }}>📎</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--brand)" }}>koshyk_2026-11.pdf</div>
          <div className="muted tabular" style={{ fontSize: 11 }}>~ 38 операцій · 124 КБ</div>
        </div>
      </div>

      <button type="button" className="btn btn-xl btn-primary">Завантажити виписку</button>
      <button type="button" className="btn btn-md btn-ghost" style={{ width: "100%", marginTop: 8 }}>Поділитись посиланням</button>
    </Sheet>
  );
}

/* ---------- Wrap into iOS frames + DC ---------- */
function AppScreens() {
  const screens = [
    ["dashboard", "Огляд", <Dashboard />],
    ["transactions", "Операції (списком)", <Transactions />],
    ["tx-search", "Операції · пошук", <TransactionsSearch />],
    ["txsheet", "Додавання операції", <TxSheet />],
    ["budgets", "Бюджети", <Budgets />],
    ["goals", "Цілі", <Goals />],
    ["wallet-picker", "Pickers · гаманець", <WalletPicker />],
    ["currency-picker", "Pickers · валюта", <CurrencyPicker />],
    ["date-picker", "Pickers · дата", <DatePicker />],
    ["notifications", "Сповіщення", <Notifications />],
    ["export", "Виписка / експорт", <ExportSheet />],
    ["onb-1", "Онбординг · 1", <OnboardingWelcome />],
    ["onb-2", "Онбординг · 2", <OnboardingAccounts />],
    ["onb-3", "Онбординг · 3", <OnboardingBudgets />],
    ["onb-4", "Онбординг · 4", <OnboardingDone />],
    ["tx-empty", "Операції · empty", <TransactionsEmpty />],
    ["budgets-empty", "Бюджети · empty", <BudgetsEmpty />],
    ["goals-empty", "Цілі · empty", <GoalsEmpty />],
  ];
  return (
    <div className="canvas-section">
      <p className="sec-eyebrow">03 — Product</p>
      <h2 className="sec-title">Екрани застосунку</h2>
      <p className="sec-subtitle">5 ключових екранів у iOS-фреймі плюс 3 empty-state варіанти для онбордингу. Логіка та копірайт — українські, тапабельність ≥44px, числа моноширинно.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "flex-start" }}>
        {screens.map(([k, title, content]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div className="muted tiny" style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</div>
            <IOSDevice width={390} height={844}>
              {content}
            </IOSDevice>
          </div>
        ))}
      </div>
    </div>
  );
}
window.AppScreens = AppScreens;
