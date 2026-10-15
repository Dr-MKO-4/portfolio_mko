import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../i18n.jsx";
import { PROFILE } from "../data/profile.js";
import { EASE, Magnetic, useLenis } from "./motion.jsx";

const LINKS = [
  { to: "/", key: "navHome" },
  { to: "/projets", key: "navProjects" },
  { to: "/parcours", key: "navJourney" },
  { to: "/contact", key: "navContact" },
];

export function Logo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64"><path d="M12 48V16l20 20 20-20v32" fill="none" stroke="#cd4918" strokeWidth="7" /></svg>
    </span>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-switch" role="group" aria-label="Langue / Language">
      <motion.span className="lang-pill" animate={{ x: lang === "fr" ? 0 : 38 }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />
      {["fr", "en"].map((l) => (
        <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { ui } = useLang();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onDark = pathname === "/" || pathname === "/parcours" || pathname === "/contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}${onDark ? " on-dark" : ""}`}>
        <div className="wrap nav-inner">
          <Link to="/" className="brand" aria-label="Accueil">
            <Logo />
            <span>
              G. Miguel MOUKOKO
              <small>Data · IA · Software</small>
            </span>
          </Link>
          <nav aria-label="Principal">
            <ul className="nav-links">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="nav-link">
                    {ui(l.key)}
                    {isActive(l.to) && <motion.span layoutId="nav-dot" className="dot" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <LangSwitch />
            <Magnetic>
              <Link to="/contact" className="btn btn-primary nav-cta" data-cursor={ui("letsTalk")}>
                {ui("letsTalk")} <span className="arrow">→</span>
              </Link>
            </Magnetic>
            <button className="burger" onClick={() => setOpen(true)} aria-label={ui("menu")} aria-expanded={open}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className="mobile-menu-close" onClick={() => setOpen(false)}>{ui("close")}</button>
            <ul style={{ listStyle: "none" }}>
              {LINKS.map((l, i) => (
                <motion.li key={l.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, ease: EASE, duration: 0.7 }}>
                  <Link to={l.to} onClick={() => setOpen(false)} className={`big${isActive(l.to) ? " accent" : ""}`}>{ui(l.key)}</Link>
                </motion.li>
              ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <LangSwitch />
              <a href={`mailto:${PROFILE.email}`} className="mono">{PROFILE.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const { ui } = useLang();
  const lenis = useLenis();
  const toTop = () => (lenis.current ? lenis.current.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }));
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <p className="lead" style={{ color: "var(--muted-dark)" }}>{ui("footerLine")}</p>
            <a href={`mailto:${PROFILE.email}`} className="h-3" style={{ display: "inline-block", marginTop: 18 }}>{PROFILE.email}</a>
          </div>
          <div>
            <h5 className="mono">Navigation</h5>
            <ul>
              {LINKS.map((l) => <li key={l.to}><Link to={l.to}>{ui(l.key)}</Link></li>)}
            </ul>
          </div>
          <div>
            <h5 className="mono">Social</h5>
            <ul>
              {PROFILE.socials.map((s) => (
                <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-name">MOUKOKO<span className="accent">.</span></div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} Georges Miguel MOUKOKO EKAMBI</span>
          <button onClick={toTop} className="mono">{ui("backTop")} ↑</button>
        </div>
      </div>
    </footer>
  );
}
