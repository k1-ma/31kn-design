/* Root app — assembles all phases with theme + tweaks */
const { useEffect: useEf } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "brandHue": 280,
  "fontDisplay": "Geist",
  "density": "regular",
  "radius": "normal"
}/*EDITMODE-END*/;

const DENSITY_SCALE = { compact: 0.85, regular: 1, comfy: 1.18 };
const RADIUS_SCALE = { sharp: 0.5, normal: 1, round: 1.4 };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEf(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.theme);
    root.style.setProperty("--brand-hue", t.brandHue);
    root.style.setProperty("--density", DENSITY_SCALE[t.density] ?? 1);
    root.style.setProperty("--r-scale", RADIUS_SCALE[t.radius] ?? 1);
    root.style.setProperty("--font-display-active", `"${t.fontDisplay}", "Geist", system-ui`);
  }, [t.theme, t.brandHue, t.fontDisplay, t.density, t.radius]);

  const reset = () => setTweak(TWEAK_DEFAULTS);

  return (
    <>
      <div className="canvas-wrap">
        <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>
          <div>
            <p className="sec-eyebrow">Koshyk · Redesign proposal</p>
            <h1 className="font-display" style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }}>Концепт v2</h1>
            <p className="muted" style={{ marginTop: 8, maxWidth: "60ch", lineHeight: 1.55 }}>
              Чотири фази: дизайн-система → лендінг → екрани застосунку → нотатки для коду. Усе в одному файлі — гортай вниз. Ввімкни <span style={{ color: "var(--text)", fontWeight: 500 }}>Tweaks</span> на тулбарі — там тема, відтінок бренду, щільність і скруглення.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="badge brand">v2 · 2026</span>
            <button type="button" className="btn btn-md btn-outline" aria-label={t.theme === "light" ? "Перемкнути на темну тему" : "Перемкнути на світлу тему"} onClick={() => setTweak("theme", t.theme === "light" ? "dark" : "light")}>
              {t.theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>

        <DesignSystem />
        <Landing />
        <AppScreens />
        <Handoff />

        <div style={{ textAlign: "center", marginTop: 64, paddingTop: 32, borderTop: "1px dashed var(--border-strong)", color: "var(--text-subtle)", fontSize: 12, fontFamily: "var(--font-mono)" }}>
          end of proposal · made with claude · 2026
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={t.theme} options={["light", "dark"]} onChange={v => setTweak("theme", v)} />
        <TweakSection label="Brand" />
        <TweakSlider label="Hue" value={t.brandHue} min={0} max={360} step={1} unit="°" onChange={v => setTweak("brandHue", v)} />
        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density} options={["compact", "regular", "comfy"]} onChange={v => setTweak("density", v)} />
        <TweakRadio label="Radius" value={t.radius} options={["sharp", "normal", "round"]} onChange={v => setTweak("radius", v)} />
        <TweakSection label="Type" />
        <TweakSelect label="Display" value={t.fontDisplay} options={["Geist", "Inter"]} onChange={v => setTweak("fontDisplay", v)} />
        <TweakSection label="Reset" />
        <TweakButton label="Restore defaults" onClick={reset} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
