import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
import Lenis from "lenis";
import { Cursor, Preloader, ScrollContext } from "./components/motion.jsx";
import { Footer, Nav } from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Journey from "./pages/Journey.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

function firstVisit() {
  try { return !sessionStorage.getItem("mko-loaded"); } catch { return true; }
}

export default function App() {
  const location = useLocation();
  const lenis = useRef(null);
  const [loading, setLoading] = useState(firstVisit);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.current = l;
    let id;
    const raf = (t) => { l.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); l.destroy(); lenis.current = null; };
  }, []);

  useEffect(() => {
    if (loading) lenis.current?.stop(); else lenis.current?.start();
  }, [loading]);

  const done = () => {
    try { sessionStorage.setItem("mko-loaded", "1"); } catch { /* storage unavailable */ }
    setLoading(false);
  };

  const resetScroll = () => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <ScrollContext.Provider value={lenis}>
        {loading && <Preloader onDone={done} />}
        <Cursor />
        <Nav />
        <AnimatePresence mode="wait" onExitComplete={resetScroll}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home ready={!loading} />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/projets/:slug" element={<ProjectDetail />} />
            <Route path="/parcours" element={<Journey />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </ScrollContext.Provider>
    </MotionConfig>
  );
}
