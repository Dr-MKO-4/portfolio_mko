import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
} from "motion/react";

export const EASE = [0.22, 1, 0.36, 1];

/* ---------- Split text: words rise from a mask ---------- */
export function SplitText({ text, as: Tag = "span", className, delay = 0, stagger = 0.045, once = true, play = true }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const inView = seen && play;
  const words = String(text).split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span className="split-word" key={i} aria-hidden="true">
          <motion.span
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Generic reveal ---------- */
export function Reveal({ children, delay = 0, y = 40, className, as = "div", ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/* ---------- Statement: words light up with scroll ---------- */
export function ScrollStatement({ text, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const isAccent = children.startsWith("*");
  return (
    <motion.span className={`statement-word${isAccent ? " serif accent" : ""}`} style={{ opacity }}>
      {isAccent ? children.slice(1) : children}
    </motion.span>
  );
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const reduce = useReducedMotion();
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x, y, display: "inline-block" }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/* ---------- Custom cursor (labels via data-cursor attribute) ---------- */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const lx = useSpring(x, { stiffness: 180, damping: 22 });
  const ly = useSpring(y, { stiffness: 180, damping: 22 });
  const [label, setLabel] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const el = e.target.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  return (
    <>
      <motion.div className="cursor" style={{ x: sx, y: sy }}>
        <motion.div className="cursor-dot" animate={{ scale: label ? 0 : 1 }} />
      </motion.div>
      <motion.div
        className="cursor-label"
        style={{ x: lx, y: ly }}
        initial={false}
        animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {label}
      </motion.div>
    </>
  );
}

/* ---------- Preloader (once per session) ---------- */
export function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setShow(false), 180),
    });
    return () => c.stop();
  }, []);
  return (
    <motion.div
      className="preloader"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={show ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => { if (!show) onDone(); }}
    >
      <div className="preloader-top mono">
        <motion.img className="preloader-logo" src="/logo-mko-192.png" alt="" initial={{ scale: 0.6, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 0.9, ease: EASE }} />
        <span>Douala · CM</span>
      </div>
      <div>
        <div className="preloader-count">
          {count}
          <span style={{ color: "var(--orange)" }}>%</span>
        </div>
        <div className="preloader-bar">
          <motion.div style={{ scaleX: count / 100 }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Page wrapper with curtain transition ---------- */
const COLS = 5;
export function Page({ children }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <div className="curtain" aria-hidden="true">
          {Array.from({ length: COLS }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1, transformOrigin: "top" }}
              animate={{ scaleY: 0, transformOrigin: "top", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }}
              exit={{ scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.04 * i } }}
            />
          ))}
        </div>
      )}
      <motion.main initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1, transition: { duration: 0.8 } }}>
        {children}
      </motion.main>
    </>
  );
}

/* ---------- Velocity marquee ---------- */
export function Marquee({ items, baseSpeed = 40 }) {
  const x = useMotionValue(0);
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-4, 1, 4], { clamp: false });
  const reduce = useReducedMotion();
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce || !ref.current) return;
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    const half = ref.current.scrollWidth / 2;
    let next = x.get() - dir.current * baseSpeed * (delta / 1000) * Math.max(1, Math.abs(f));
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });

  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div ref={ref} className="marquee-track" style={{ x }}>
        {doubled.map((it, i) => (
          <span key={i} className={i % 2 ? "serif" : ""}>{it}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Animated counter ---------- */
export function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.8, ease: EASE, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <div ref={ref} className="counter-val">
      {v}
      {suffix && <sup>{suffix}</sup>}
    </div>
  );
}

/* ---------- Seeded random ---------- */
function rng(seedStr) {
  let h = 2166136261;
  for (const ch of seedStr) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothPath(pts) {
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

/* ---------- Signature: animated B-spline field (KAN learned activations) ---------- */
export function SplineField({ className, lines = 16, seed = "mko", accentIndex = 9, light = false }) {
  const W = 1600, H = 900, K = 11;
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const pathRefs = useRef([]);
  const knotRefs = useRef([]);
  const pointer = useRef({ x: 0.7, y: 0.5, tx: 0.7, ty: 0.5 });
  const visible = useRef(true);

  const params = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: lines }, (_, i) => ({
      base: H * (0.12 + (0.8 * i) / (lines - 1)),
      amp: 30 + r() * 70,
      speed: 0.12 + r() * 0.22,
      phases: Array.from({ length: K }, () => r() * Math.PI * 2),
      freqs: Array.from({ length: K }, () => 0.6 + r() * 1.2),
    }));
  }, [lines, seed]);

  const compute = (t) => {
    const p = pointer.current;
    p.x += (p.tx - p.x) * 0.05;
    p.y += (p.ty - p.y) * 0.05;
    return params.map((c, li) => {
      const pts = [];
      for (let k = 0; k < K; k++) {
        const x = (W * k) / (K - 1);
        const nx = k / (K - 1);
        const wave = Math.sin(t * c.speed * c.freqs[k] + c.phases[k]);
        const env = 0.35 + 0.65 * Math.sin(Math.PI * nx);
        const dx = nx - p.x;
        const lineY = c.base / H;
        const pull = Math.exp(-(dx * dx) / 0.02) * Math.exp(-((lineY - p.y) ** 2) / 0.05) * 90;
        pts.push([x, c.base + wave * c.amp * env - pull * (li % 2 ? 1 : -1)]);
      }
      return pts;
    });
  };

  const draw = (t) => {
    const all = compute(t);
    all.forEach((pts, i) => {
      const el = pathRefs.current[i];
      if (el) el.setAttribute("d", smoothPath(pts));
      if (i === accentIndex) {
        pts.forEach((pt, k) => {
          const kn = knotRefs.current[k];
          if (kn) { kn.setAttribute("cx", pt[0].toFixed(1)); kn.setAttribute("cy", pt[1].toFixed(1)); }
        });
      }
    });
  };

  useEffect(() => {
    draw(0);
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    io.observe(el);
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pointer.current.tx = (e.clientX - r.left) / r.width;
      pointer.current.ty = (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove);
    return () => { io.disconnect(); window.removeEventListener("pointermove", onMove); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationFrame((time) => {
    if (reduce || !visible.current) return;
    draw(time / 1000);
  });

  const stroke = light ? "rgba(42,46,50,0.12)" : "rgba(243,239,232,0.10)";
  return (
    <svg ref={wrapRef} className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {params.map((_, i) => (
        <motion.path
          key={i}
          ref={(n) => (pathRefs.current[i] = n)}
          fill="none"
          stroke={i === accentIndex ? "#cd4918" : stroke}
          strokeWidth={i === accentIndex ? 2.4 : 1.2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.2 + i * 0.05 }}
        />
      ))}
      {Array.from({ length: K }).map((_, k) => (
        <motion.circle
          key={k}
          ref={(n) => (knotRefs.current[k] = n)}
          r="5"
          fill={light ? "#f3efe8" : "#2a2e32"}
          stroke="#cd4918"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + k * 0.06, duration: 0.5 }}
        />
      ))}
    </svg>
  );
}

/* ---------- Generated cover for projects without imagery ---------- */
export function GenCover({ seed, color = "#cd4918", initials, dark = true }) {
  const paths = useMemo(() => {
    const r = rng(seed);
    const out = [];
    const n = 9;
    for (let i = 0; i < n; i++) {
      const base = 60 + (i * 300) / n;
      const pts = Array.from({ length: 8 }, (_, k) => [(k * 640) / 7, base + (r() - 0.5) * 110]);
      out.push(smoothPath(pts));
    }
    return out;
  }, [seed]);
  const bg = dark ? "#2a2e32" : "#e9e3d8";
  return (
    <svg className="gen-cover" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="640" height="400" fill={bg} />
      <circle cx="520" cy="80" r="160" fill={color} opacity="0.16" />
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i === 4 ? color : dark ? "rgba(243,239,232,0.14)" : "rgba(42,46,50,0.16)"} strokeWidth={i === 4 ? 3 : 1.3} />
      ))}
      {initials && (
        <text x="36" y="360" fontFamily="Space Grotesk, sans-serif" fontWeight="600" fontSize="96" letterSpacing="-4" fill={dark ? "#f3efe8" : "#2a2e32"} opacity="0.92">
          {initials}
        </text>
      )}
    </svg>
  );
}

/* ---------- Smooth scroll context ---------- */
export const ScrollContext = createContext({ current: null });
export const useLenis = () => useContext(ScrollContext);
