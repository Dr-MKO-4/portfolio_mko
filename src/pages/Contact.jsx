import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { PROFILE } from "../data/profile.js";
import { Magnetic, Page, Reveal, SplineField, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";

export default function Contact() {
  const { t, ui } = useLang();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) { setError(true); return; }
    setError(false);
    const subject = form.subject.trim() || `Contact · ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n${form.name.trim()}${form.email.trim() ? ` · ${form.email.trim()}` : ""}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <Page>
      <section className="dark contact" style={{ position: "relative", overflow: "hidden" }}>
        <SplineField className="hero-field" lines={12} seed="contact" accentIndex={4} />
        <div className="wrap" style={{ position: "relative" }}>
          <span className="eyebrow">{ui("contactEyebrow")}</span>
          <h1 className="h-display" style={{ marginTop: 20 }}>
            <SplitText className="split-line" text={ui("contactTitle1")} delay={0.5} />
            <SplitText className="split-line serif accent" text={ui("contactTitle2")} delay={0.65} />
          </h1>
          <div className="contact-grid">
            <Reveal delay={0.7}>
              <p className="lead muted-on-dark" style={{ marginBottom: 32 }}>{ui("contactIntro")}</p>
              <div className="contact-lines">
                <div className="contact-line">
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                  <button className="mono" onClick={copy}>{copied ? ui("copied") : ui("copy")}</button>
                </div>
                {PROFILE.socials.filter((s) => s.label !== "WhatsApp").map((s) => (
                  <a key={s.label} className="contact-line" href={s.url} target="_blank" rel="noopener noreferrer">
                    <span>{s.label}</span><span className="mono">↗</span>
                  </a>
                ))}
                <a className="contact-line" href={t(PROFILE.cv)} target="_blank" rel="noopener noreferrer" data-cursor={ui("cvShort")}>
                  <span>{ui("downloadCv")}</span><span className="mono">PDF ↓</span>
                </a>
                <a className="contact-line" href={PROFILE.whatsapp.url} target="_blank" rel="noopener noreferrer">
                  <span>WhatsApp · {PROFILE.whatsapp.display}</span><span className="mono">↗</span>
                </a>
                <div className="contact-line" style={{ cursor: "default" }}>
                  <span>{PROFILE.location}</span><span className="mono">GMT+1</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.8}>
              <form className="form" onSubmit={submit} noValidate>
                <div className="field">
                  <label className="mono muted-on-dark" htmlFor="cf-name">{ui("formName")} *</label>
                  <input id="cf-name" value={form.name} onChange={set("name")} autoComplete="name" />
                </div>
                <div className="field">
                  <label className="mono muted-on-dark" htmlFor="cf-email">{ui("formEmail")}</label>
                  <input id="cf-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                </div>
                <div className="field">
                  <label className="mono muted-on-dark" htmlFor="cf-subject">{ui("formSubject")}</label>
                  <input id="cf-subject" value={form.subject} onChange={set("subject")} />
                </div>
                <div className="field">
                  <label className="mono muted-on-dark" htmlFor="cf-message">{ui("formMessage")} *</label>
                  <textarea id="cf-message" rows={6} value={form.message} onChange={set("message")} />
                </div>
                {error && <p className="form-error" role="alert">{ui("formMissing")}</p>}
                <div>
                  <Magnetic>
                    <button type="submit" className="btn btn-primary">{ui("formSend")} <span className="arrow">→</span></button>
                  </Magnetic>
                </div>
                <p className="form-note">{ui("formNote")}</p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <Footer />
    </Page>
  );
}
