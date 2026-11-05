import { useTranslation } from "react-i18next";

export default function Footer({ profile }) {
  const { t } = useTranslation();

  return (
    <footer className="bg-ink text-offwhite/40 py-8 border-t border-offwhite/10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-2 text-sm">
        <span>
          © {new Date().getFullYear()} {profile?.full_name || "Murodjon"}. {t("footer.rights")}
        </span>
        <div className="flex gap-4">
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-brass">
              GitHub
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-brass">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
