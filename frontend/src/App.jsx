import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchProfile, fetchProjects, fetchServices } from "./api.js";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { i18n } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const lang = i18n.language;
    fetchProfile(lang).then(setProfile).catch(() => setProfile(null));
    fetchProfile(lang).then(setProfile).catch((e) => {
  console.error("profile:", e);
  setProfile([]);
});
    fetchProjects(lang).then(setProjects).catch((e) => {
  console.error("projects:", e);
  setProjects([]);
});
    fetchServices(lang).then(setServices).catch((e) => {
  console.error("servicess:", e);
  setServices([]);
});
  }, [i18n.language]);

  return (
    <div>
      <Navbar name={profile?.full_name} />
      <Hero name={profile?.full_name} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Services services={services} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </div>
  );
}
