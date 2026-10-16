import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../i18n.jsx";
import { EASE } from "./motion.jsx";

export default function Lightbox({ images, index, onChange }) {
  const { t, ui } = useLang();
  const open = index !== null;
  const n = images.length;
  const go = (d) => onChange((i) => (i + d + n) % n);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((i) => (i + 1) % n);
      if (e.key === "ArrowLeft") onChange((i) => (i - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, n, onChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="lightbox" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onChange(null)}>
          <div className="lb-top mono" onClick={(e) => e.stopPropagation()}>
            <span>{index + 1} / {n}</span>
            <button onClick={() => onChange(null)} aria-label={ui("close")}>{ui("close")} ✕</button>
          </div>
          <AnimatePresence mode="wait">
            <motion.figure
              key={images[index].src}
              className="lb-figure"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -30 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <img src={images[index].src} alt={t(images[index].alt)} />
              {images[index].alt && <figcaption>{t(images[index].alt)}</figcaption>}
            </motion.figure>
          </AnimatePresence>
          {n > 1 && (
            <>
              <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Précédent / Previous">←</button>
              <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Suivant / Next">→</button>
              <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
                {images.map((im, i) => (
                  <button key={im.src} className={i === index ? "on" : ""} onClick={() => onChange(i)} aria-label={`${i + 1}`}>
                    <img src={im.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
