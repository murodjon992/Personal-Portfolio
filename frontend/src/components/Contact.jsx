import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitContactMessage } from "../api.js";

export default function Contact({ profile }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", contact_info: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm({ name: "", contact_info: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-ink text-offwhite py-24">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-3xl mb-2">{t("contact.heading")}</h2>
          <p className="text-offwhite/60 mb-10 max-w-sm">{t("contact.subheading")}</p>

          {profile && (profile.email || profile.telegram || profile.phone) && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wide text-offwhite/40 mb-3">
                {t("contact.direct_heading")}
              </h3>
              <ul className="flex flex-col gap-2 text-offwhite/80">
                {profile.email && <li><a className="hover:text-brass" href={`mailto:${profile.email}`}>{profile.email}</a></li>}
                {profile.telegram && (
                  <li>
                    <a
                      className="hover:text-brass"
                      href={`https://t.me/${profile.telegram.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {profile.telegram}
                    </a>
                  </li>
                )}
                {profile.phone && <li>{profile.phone}</li>}
              </ul>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-offwhite/60 mb-1.5">{t("contact.name_label")}</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-offwhite/25 px-4 py-2.5 focus:border-brass outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-offwhite/60 mb-1.5">{t("contact.contact_label")}</label>
            <input
              required
              name="contact_info"
              value={form.contact_info}
              onChange={handleChange}
              className="w-full bg-transparent border border-offwhite/25 px-4 py-2.5 focus:border-brass outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-offwhite/60 mb-1.5">{t("contact.message_label")}</label>
            <textarea
              required
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full bg-transparent border border-offwhite/25 px-4 py-2.5 focus:border-brass outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-brass text-ink font-medium px-6 py-3 hover:bg-brass-light transition-colors disabled:opacity-60"
          >
            {status === "sending" ? t("contact.sending") : t("contact.submit")}
          </button>

          {status === "success" && <p className="text-brass text-sm">{t("contact.success")}</p>}
          {status === "error" && <p className="text-red-400 text-sm">{t("contact.error")}</p>}
        </form>
      </div>
    </section>
  );
}
