import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, delay: i * 0.15, ease: "easeInOut" }, opacity: { duration: 0.3, delay: i * 0.15 } },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 + i * 0.12, ease: "easeOut" } }),
};

export default function Hero({ name }) {
  const { t } = useTranslation();

  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative bg-ink text-offwhite min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 blueprint-grid" aria-hidden="true" />

      {/* Signature moment: a roof-truss schematic drawing itself in on load —
          a nod to the carpentry background behind the code. */}
      <svg
        viewBox="0 0 400 200"
        className="absolute right-[-40px] bottom-0 w-[70%] max-w-xl opacity-40 md:opacity-60"
        aria-hidden="true"
      >
        <motion.path d="M20 170 L200 40 L380 170" stroke="#c88a3d" strokeWidth="2" fill="none" custom={0} variants={draw} initial="hidden" animate="visible" />
        <motion.path d="M20 170 L380 170" stroke="#c88a3d" strokeWidth="2" fill="none" custom={0.4} variants={draw} initial="hidden" animate="visible" />
        <motion.path d="M110 105 L290 105" stroke="#c88a3d" strokeWidth="1.5" fill="none" custom={0.8} variants={draw} initial="hidden" animate="visible" />
        <motion.path d="M200 40 L200 170" stroke="#c88a3d" strokeWidth="1.5" fill="none" custom={1} variants={draw} initial="hidden" animate="visible" />
        <motion.path d="M65 137 L200 137 L335 137" stroke="#c88a3d" strokeWidth="1" fill="none" custom={1.2} variants={draw} initial="hidden" animate="visible" />
      </svg>

      <div className="relative max-w-5xl mx-auto px-6 py-32 w-full">
        <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-brass font-mono text-sm mb-4">
          {t("hero.greeting")}
        </motion.p>
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display text-5xl sm:text-7xl font-medium tracking-tight mb-4"
        >
          {name || "Murodjon"}
        </motion.h1>
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-xl sm:text-2xl text-offwhite/80 mb-6">
          {t("hero.role")}
        </motion.p>
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-md text-offwhite/60 leading-relaxed mb-10"
        >
          {t("hero.tagline")}
        </motion.p>
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
          <button
            onClick={scrollToProjects}
            className="bg-brass text-ink font-medium px-6 py-3 hover:bg-brass-light transition-colors"
          >
            {t("hero.cta")}
          </button>
          <button
            onClick={scrollToContact}
            className="border border-offwhite/30 text-offwhite px-6 py-3 hover:border-brass hover:text-brass transition-colors"
          >
            {t("hero.cta_secondary")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
