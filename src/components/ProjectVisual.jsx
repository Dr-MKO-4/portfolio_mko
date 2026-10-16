import { GenCover } from "./motion.jsx";
import { useLang } from "../i18n.jsx";

export function initials(title) {
  return title
    .replace(/[^A-Za-zÀ-ÿ0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function ProjectVisual({ project, showLogo = true, logoClass = "card-logo", eager = false }) {
  const { t } = useLang();
  const name = t(project.name);
  return (
    <>
      {project.cover ? (
        <img className={`cover${project.coverFit === "cover" ? "" : " contain"}`} src={project.cover} alt="" loading={eager ? "eager" : "lazy"} />
      ) : (
        <GenCover seed={project.slug} color={project.color} initials={initials(name)} />
      )}
      {showLogo && project.logo && !project.cover && (
        <div className={logoClass}>
          <img src={project.logo} alt={`Logo ${name}`} loading="lazy" />
        </div>
      )}
    </>
  );
}
