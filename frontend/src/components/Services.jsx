import { useTranslation } from "react-i18next";

export default function Services({ services }) {
  const { t } = useTranslation();

  return (
    <section id="services" className="bg-paper py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-3xl mb-2">{t("services.heading")}</h2>
        <p className="text-slate mb-14">{t("services.subheading")}</p>

        {services.length === 0 && <p className="text-slate">{t("services.empty")}</p>}

        <div className="border-t border-ink/10">
          {services.map((service) => (
            <div
              key={service.id}
              className={`py-8 border-b border-ink/10 grid md:grid-cols-[1fr_auto] gap-4 md:gap-10 items-start ${
                service.is_highlighted ? "border-l-2 border-l-brass pl-6 -ml-6" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-xl">{service.title}</h3>
                  {service.is_highlighted && (
                    <span className="font-mono text-xs text-brass border border-brass/40 px-2 py-0.5">
                      {t("services.highlighted")}
                    </span>
                  )}
                </div>
                <p className="text-ink/70 leading-relaxed mb-3 max-w-xl">{service.description}</p>
                {service.features.length > 0 && (
                  <ul className="flex flex-col gap-1">
                    {service.features.map((f) => (
                      <li key={f} className="text-sm text-ink/60 flex gap-2">
                        <span className="text-brass">·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="font-mono text-lg text-ink whitespace-nowrap md:text-right">
                {service.price_label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
