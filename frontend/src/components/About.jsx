import { useTranslation } from "react-i18next";
import { mediaUrl } from "../api.js";

export default function About({ profile }) {
  const { t } = useTranslation();
  if (!profile) return null;

  return (
    <section id="about" className="bg-paper py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[240px_1fr] gap-12 items-start">
        {profile.photo && (
          <img
            src={mediaUrl(profile.photo)}
            alt={profile.full_name}
            className="w-40 h-40 md:w-full md:h-auto object-cover grayscale contrast-110"
          />
        )}

        <div>
          <h2 className="font-display text-3xl mb-2">{t("about.heading")}</h2>
          <p className="text-slate font-mono text-sm mb-8">
            {profile.title} · {profile.years_experience} {t("about.years_suffix")}
          </p>

          <p className="text-ink/80 leading-relaxed max-w-2xl mb-10">{profile.bio}</p>

          <h3 className="font-mono text-xs uppercase tracking-wide text-slate mb-3">
            {t("about.skills_heading")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(profile.skills || []).map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs border border-ink/15 px-3 py-1.5 text-ink/70"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
