import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "../i18n.jsx";
import { EASE, Reveal } from "./motion.jsx";

export default function LivePreview({ url, cover }) {
  const { ui } = useLang();
  const [started, setStarted] = useState(false);
  const [device, setDevice] = useState("desktop");
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <section className="live">
      <div className="wrap">
        <div className="live-head">
          <div>
            <Reveal><span className="eyebrow">{ui("liveEyebrow")}</span></Reveal>
            <Reveal><h2 className="h-2" style={{ marginTop: 14 }}>{ui("liveTitle")}</h2></Reveal>
          </div>
          <Reveal className="live-actions">
            <div className="live-toggle" role="group" aria-label={ui("liveDevice")}>
              {["desktop", "mobile"].map((d) => (
                <button key={d} className={device === d ? "on" : ""} onClick={() => setDevice(d)} aria-pressed={device === d}>
                  {device === d && <motion.span layoutId="live-dev" className="live-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span>{ui(d === "desktop" ? "liveDesktop" : "liveMobile")}</span>
                </button>
              ))}
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor={ui("view")}>
              {ui("liveOpen")} <span className="arrow">↗</span>
            </a>
          </Reveal>
        </div>

        <Reveal>
          <motion.div className={`browser ${device}`} layout transition={{ duration: 0.6, ease: EASE }}>
            <div className="browser-bar">
              <span className="dots"><i /><i /><i /></span>
              <span className="url mono"><span className="lock">●</span> {host}</span>
              <a href={url} target="_blank" rel="noopener noreferrer" className="mono">↗</a>
            </div>
            <div className="browser-body">
              {started ? (
                <iframe src={url} title={host} loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
              ) : (
                <button className="live-start" onClick={() => setStarted(true)} data-cursor={ui("view")}>
                  {cover && <img src={cover} alt="" />}
                  <span className="live-start-cta"><span className="pulse" /> {ui("liveStart")}</span>
                </button>
              )}
            </div>
          </motion.div>
        </Reveal>
        <p className="mono muted live-note">{ui("liveNote")}</p>
      </div>
    </section>
  );
}
