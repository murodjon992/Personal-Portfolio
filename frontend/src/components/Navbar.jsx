import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from '../assets/oxirgilogo.svg';

const LANGS = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const LINKS = [
  { id: "about", key: "nav.about" },
  { id: "projects", key: "nav.projects" },
  { id: "services", key: "nav.services" },
  { id: "contact", key: "nav.contact" },
];

export default function Navbar({ name }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setOpen(false);
  };

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/70 backdrop-blur border-b border-offwhite/10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollTo("top")}
          className="font-display text-dark text-lg tracking-tight"
        >
          <div className="flex items-center gap-2">
        <img src={logo} alt="smdev.uz logo" className="h-20 w-auto" />
        <span className="font-bold text-lg">Sotvoldiyev Murodjon</span>
      </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm text-offdark/80 hover:text-brass transition-colors"
            >
              {t(link.key)}
            </button>
          ))}
          <div className="flex items-center gap-1 pl-4 border-l border-dark/30">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                className={`font-mono text-xs px-2 py-1 rounded transition-colors ${
                  i18n.language === l.code
                    ? "text-orange-500"
                    : "text-dark/50 hover:text-dark"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>

        <button
          className="md:hidden text-slate-900"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-900 px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-dark"
            >
              {t(link.key)}
            </button>
          ))}
          <div className="flex gap-3 pt-2 border-t border-slate-900">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                className={`font-mono text-xs px-2 py-1 ${
                  i18n.language === l.code ? "text-brass" : "text-offwhite/50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
