const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function request(path, { lang, ...options } = {}) {
  const url = new URL(`${API_URL}${path}`);
  if (lang) url.searchParams.set("lang", lang);

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

export function fetchProfile(lang) {
  return request("/profile/", { lang });
}

export function fetchProjects(lang) {
  return request("/projects/", { lang });
}

export function fetchServices(lang) {
  return request("/services/", { lang });
}

export function submitContactMessage(payload) {
  return request("/contact/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}${path}`;
}
