import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { useLang } from "../i18n.jsx";
import { EXPERIENCES, SKILLS, EDUCATION, CERTIFICATIONS, LANGUAGES, PROFILE } from "../data/profile.js";
import { Magnetic, Page, Reveal, SplineField, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";

export default function Journey() {
  const { t, ui, lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <Page>
      <section className="dark" style={{ position: "relative", overflow: "hidden", padding: "132px 0 70px" }}>
        <SplineField className="hero-field" lines={10} seed="journey" accentIndex={6} />
        <div className="wrap" style={{ position: "relative" }}>
          <h1 className="h-display">
            <SplitText text={ui("journeyTitle")} delay={0.5} />
          </h1>
          <Reveal delay={0.7} style={{ marginTop: 28 }}>
            <Magnetic>
              <a href={t(PROFILE.cv)} className="btn btn-primary" target="_blank" rel="noopener noreferrer" data-cursor={ui("cvShort")}>{ui("downloadCv")} <span className="arrow">↓</span></a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      <section className="dark" style={{ paddingBottom: "clamp(70px, 8.8vw, 123px)" }}>
        <div className="wrap">
          <div ref={ref} className="timeline">
            <div className="timeline-track">
              <motion.div className="timeline-fill" style={{ scaleY: scrollYProgress }} />
            </div>
            {EXPERIENCES.map((e, i) => {
              const points = t(e.points) || [];
              return (
                <Reveal key={i} className="tl-item" y={30}>
                  <div>
                    <span className="tl-when mono">{t(e.when)}</span>
                    <div className="tl-org">
                      {e.logo && <img src={e.logo} alt="" />}
                      <span className="h-3">{t(e.org)}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="h-3" style={{ color: "var(--paper)" }}>{t(e.role)}</h3>
                    {points.length > 0 && <ul>{points.map((pt, k) => <li key={k}>{pt}</li>)}</ul>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap edu-grid">
          <div>
            <h2 className="h-3">{ui("educationTitle")}</h2>
            <div className="edu-list">
              {EDUCATION.map((e, i) => (
                <Reveal key={i} className="edu-item" delay={i * 0.06}>
                  <span className="mono accent">{t(e.when)}</span>
                  <h3 className="h-3">{t(e.title)}</h3>
                  <p className="muted">{t(e.where)}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <h2 className="h-3">{ui("certsTitle")}</h2>
            <ul className="edu-list plain">{CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}</ul>
            <h2 className="h-3" style={{ marginTop: 32 }}>{ui("langsTitle")}</h2>
            <ul className="edu-list plain">{LANGUAGES.map((l) => <li key={l.name}><b>{l.name}</b> · {t(l.level)}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <SplitText as="h2" className="h-1" text={lang === "fr" ? "Ma boîte à outils" : "My toolbox"} />
            </div>
          </div>
          <div className="skills">
            {SKILLS.map((s, i) => (
              <Reveal key={i} className="skill-col" delay={i * 0.06}>
                <h4 className="mono">{t(s.title)}</h4>
                <ul>{s.items.map((it) => <li key={it} className="chip">{it}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Page>
  );
}
