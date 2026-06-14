"use client";

import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FEATURES = [
  {
    icon: "📄",
    title: "Source Grounding",
    desc: "Upload PDFs, articles, and documents. Athena reads, indexes, and anchors every answer to your actual sources.",
  },
  {
    icon: "🎙️",
    title: "Audio Overviews",
    desc: "Turn any research into a natural podcast-style deep dive. Listen while you commute, run, or think.",
  },
  {
    icon: "💬",
    title: "Interactive Chat",
    desc: "Ask follow-up questions grounded in your sources. Get cited, trustworthy answers — not hallucinations.",
  },
  {
    icon: "🧠",
    title: "Knowledge Synthesis",
    desc: "Connect ideas across documents. Athena finds the patterns and themes you'd miss reading alone.",
  },
  {
    icon: "📝",
    title: "Smart Notebooks",
    desc: "Organize your research into notebooks with auto-generated outlines, summaries, and key takeaways.",
  },
  {
    icon: "🔗",
    title: "Open & Extensible",
    desc: "Self-hosted, API-first, and fully open source. Your data stays yours. Extend it however you want.",
  },
];

export default function LandingPage() {
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health/`, {
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) {
          setBackendStatus("online");
        } else {
          setBackendStatus("offline");
        }
      } catch {
        setBackendStatus("offline");
      }
    };

    checkBackend();

    // Track mouse position for glow effect on feature cards
    const handleMouse = (e: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--mouse-x",
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${e.clientY}px`
      );
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      {/* Background effects */}
      <div className="orb orb--1" aria-hidden="true" />
      <div className="orb orb--2" aria-hidden="true" />
      <div className="orb orb--3" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <div className="page">
        {/* ── Navigation ── */}
        <nav className="nav" id="main-nav">
          <div className="nav__logo">
            <span className="nav__logo-icon">⚡</span>
            Athena
          </div>
          <ul className="nav__links">
            <li>
              <a className="nav__link" href="#features">
                Features
              </a>
            </li>
            <li>
              <a
                className="nav__link"
                href="https://github.com/jayakrishnanps/Athena"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
          <button className="nav__cta" id="nav-get-started">
            Get Started
          </button>
        </nav>

        {/* ── Hero ── */}
        <section className="hero" id="hero">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Open-Source AI Research Tool
          </div>

          <h1 className="hero__title">
            Research smarter
            <br />
            with <span className="hero__title-gradient">Athena</span>
          </h1>

          <p className="hero__subtitle">
            Upload your sources. Ask questions. Get podcast-style deep dives.
            Athena is the open-source alternative to NotebookLM — built for
            researchers, students, and curious minds.
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary" id="hero-cta-primary">
              Start Exploring →
            </button>
            <a
              className="btn btn--ghost"
              id="hero-cta-github"
              href="https://github.com/jayakrishnanps/Athena"
              target="_blank"
              rel="noopener noreferrer"
            >
              ★ Star on GitHub
            </a>
          </div>

          <div className="hero__status">
            <span
              className={`hero__status-dot ${
                backendStatus === "offline"
                  ? "hero__status-dot--offline"
                  : ""
              }`}
            />
            {backendStatus === "checking" && "Checking backend…"}
            {backendStatus === "online" && "Backend connected — API live"}
            {backendStatus === "offline" &&
              "Backend offline — start Django server"}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="features" id="features">
          <div className="features__header">
            <p className="features__label">Capabilities</p>
            <h2 className="features__title">
              Everything you need to understand anything
            </h2>
          </div>

          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <article
                className="feature-card"
                key={i}
                id={`feature-card-${i}`}
              >
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer" id="footer">
          <span>© {new Date().getFullYear()} Athena. Open source & free.</span>
          <ul className="footer__links">
            <li>
              <a
                className="footer__link"
                href="https://github.com/jayakrishnanps/Athena"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <span className="footer__link">Docs</span>
            </li>
            <li>
              <span className="footer__link">Privacy</span>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
