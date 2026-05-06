/* App screens: Dashboard, Transactions, TxSheet, Budgets, Goals
   Each rendered inside an iOS frame for fidelity. */
const { useState: useSc } = React;

const fmt = (n) => new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n).replace(/\u00A0/g, " ");

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
          <button className="icon-btn"><Icons.search /></button>
          <button className="icon-btn" style={{ position: "relative" }}>
            <Icons.bell />
            <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 999, background: "var(--brand)", border: "2px solid var(--surface)" }} />
          </button>
        </div>
      </div>

      {/* Hero balance card */}
      <div style={{ margin: "8px 16px 16px", padding: "20px", borderRadius: "var(--r-2xl)", background: "linear-gradient(135deg, var(--brand) 0%, oklch(0.45 0.16 290) 100%)", color: "white", boxShadow: "var(--sh-brand)", position: "relative", overflow: "hidden" }}>
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
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 8px", borderTop: i ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{t[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{t[1]}</div>
              <div className="muted" style={{ fontSize: 11 }}>{t[2]} · {t[4]}</div>
            </div>
            <div className="tabular" style={{ fontWeight: 600, fontSize: 14, color: t[6] ? "var(--success)" : "var(--text)" }}>{t[3]} ₴</div>
          </div>
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
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "color-mix(in oklch, var(--surface) 80%, transparent)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", padding: "8px 8px 22px", display: "flex", justifyContent: "space-around" }}>
      {items.map(it => it.k === "fab" ? <div key="fab" style={{ width: 56 }} /> : (
        <button key={it.k} className="icon-btn" style={{ flexDirection: "column", height: "auto", gap: 2, padding: "6px 8px", color: active === it.k ? "var(--brand)" : "var(--text-subtle)" }}>
          <it.I />
          <span style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>{it.L}</span>
        </button>
      ))}
    </div>
  );
}
function Fab() {
  return (
    <button style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", width: 56, height: 56, borderRadius: "var(--r-full)", background: "var(--brand)", color: "var(--on-brand)", border: "4px solid var(--bg)", boxShadow: "var(--sh-brand)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
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
          <button className="icon-btn"><Icons.search /></button>
        </div>
        <div style={{ display: "flex", gap: 6, overflow: "auto", marginBottom: 8 }}>
          <span className="chip active"><Icons.filter /> Листопад</span>
          <span className="chip">Усі рахунки</span>
          <span className="chip">Усі категорії</span>
        </div>
        <div className="seg" style={{ width: "100%" }}>
          <div className="seg-item active grow" style={{ textAlign: "center" }}>Усі</div>
          <div className="seg-item grow" style={{ textAlign: "center" }}>Витрати</div>
          <div className="seg-item grow" style={{ textAlign: "center" }}>Доходи</div>
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
      ].map(([day, sum, rows], i) => (
        <div key={i} style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px 6px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <span>{day}</span><span className="tabular">{sum}</span>
          </div>
          <div style={{ background: "var(--surface)", margin: "0 12px", borderRadius: "var(--r-lg)", border: "1px solid var(--border)" }}>
            {rows.map((t, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: j ? "1px solid var(--border)" : "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: "var(--r-md)", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{t[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{t[1]}</div>
                  <div className="muted" style={{ fontSize: 11 }}>{t[2]} · {t[5]}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="tabular" style={{ fontWeight: 600, fontSize: 14, color: t[6] ? "var(--success)" : "var(--text)" }}>{t[3]} ₴</div>
                  <div className="muted tabular" style={{ fontSize: 10 }}>{t[4]}</div>
                </div>
              </div>
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

        <div className="seg" style={{ width: "100%", marginBottom: 16 }}>
          {[["expense","Витрата"],["income","Дохід"],["transfer","Переказ"]].map(([k,L]) => (
            <div key={k} className={`seg-item grow ${type === k ? "active" : ""}`} style={{ textAlign: "center" }} onClick={() => setType(k)}>{L}</div>
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
            ["Нотатка","Сільпо на Хрещатику"],
            ["Теги","#продукти"],
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderTop: i ? "1px solid var(--border)" : "none" }}>
              <span className="muted" style={{ fontSize: 13, width: 80 }}>{r[0]}</span>
              <span style={{ fontSize: 14, flex: 1 }}>{r[1]}</span>
              <Icons.chevR style={{ color: "var(--text-subtle)" }} />
            </div>
          ))}
        </div>

        <button className="btn btn-xl btn-primary" style={{ marginTop: 20 }}>Зберегти</button>
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
        <div className="seg" style={{ width: "100%" }}>
          <div className="seg-item grow" style={{ textAlign: "center" }}>Тиждень</div>
          <div className="seg-item active grow" style={{ textAlign: "center" }}>Місяць</div>
          <div className="seg-item grow" style={{ textAlign: "center" }}>Рік</div>
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: "8px 12px 100px" }}>
        {items.map((it, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 14 }}>
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
      <div style={{ margin: "12px 16px", padding: 24, borderRadius: "var(--r-2xl)", background: "linear-gradient(135deg, var(--brand-soft) 0%, oklch(0.94 0.04 290) 100%)", border: "1px solid var(--border)", textAlign: "center" }}>
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
        {[["💻","Новий MacBook",42,"42 000 ₴","100 000 ₴","var(--brand)"],["🚗","Перший внесок на авто",18,"18 000 ₴","100 000 ₴","var(--info)"],["🎓","Курс англійської",100,"12 000 ₴","12 000 ₴","var(--success)"]].map((g, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 14 }}>
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

/* ---------- Wrap into iOS frames + DC ---------- */
function AppScreens() {
  const screens = [
    ["dashboard", "Огляд", <Dashboard />],
    ["transactions", "Операції (списком)", <Transactions />],
    ["txsheet", "Додавання операції", <TxSheet />],
    ["budgets", "Бюджети", <Budgets />],
    ["goals", "Цілі", <Goals />],
  ];
  return (
    <div className="canvas-section">
      <p className="sec-eyebrow">03 — Product</p>
      <h2 className="sec-title">Екрани застосунку</h2>
      <p className="sec-subtitle">5 ключових екранів у iOS-фреймі: Dashboard, список операцій, sheet додавання, бюджети, цілі. Логіка та копірайт — українські, тапабельність ≥44px, числа моноширинно.</p>
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
