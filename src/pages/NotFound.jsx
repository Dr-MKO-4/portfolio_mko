import { Link } from "react-router-dom";
import { useLang } from "../i18n.jsx";
import { Page, SplitText } from "../components/motion.jsx";
import { Footer } from "../components/Layout.jsx";

export default function NotFound() {
  const { ui } = useLang();
  return (
    <Page>
      <section className="notfound">
        <div>
          <h1 className="h-display"><SplitText text="404" delay={0.5} /></h1>
          <p className="lead muted" style={{ margin: "20px auto 32px" }}>{ui("notFound")}</p>
          <Link to="/" className="btn btn-primary">{ui("backHome")} <span className="arrow">→</span></Link>
        </div>
      </section>
      <Footer />
    </Page>
  );
}
