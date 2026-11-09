import { useTranslation } from "react-i18next";
import { mediaUrl } from "../api.js";

export default function Projects({ projects }) {
  const { t } = useTranslation();

  return (
    <section id="projects" className="bg-ink text-offwhite py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-3xl mb-2">{t("projects.heading")}</h2>
        <p className="text-offwhite/50 mb-16">{t("projects.subheading")}</p>

        {projects.length === 0 && <p className="text-offwhite/40">{t("projects.empty")}</p>}

        <div className="flex flex-col gap-20">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {project.image ? (
                <img
                  src={mediaUrl(project.image)}
                  alt={project.title}
                  className="w-full aspect-video object-cover border border-offwhite/10"
                />
              ) : (
                <div className="w-full aspect-video border border-offwhite/10 flex items-center justify-center text-offwhite/20 font-mono text-sm">
                  {project.title}
                </div>
              )}

              <div>
                <h3 className="font-display text-2xl mb-3">{project.title}</h3>
                <h4 className="text-offwhite/90 py-4 m-2">{project.summary}</h4>
                <p className="text-offwhite/70 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech_stack.map((tech) => (
                    <span key={tech} className="font-mono text-xs text-brass/90 border border-brass/30 px-2.5 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-offwhite border-b border-brass hover:text-brass transition-colors"
                  >
                    {t("projects.visit")}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
