"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

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

const HERO_VERBS = ["Research smarter", "Learn faster", "Synthesize deeper"];

export default function LandingPage() {
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  
  const [verbIndex, setVerbIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Backend health check
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

    // Cycling text effect
    const interval = setInterval(() => {
      setVerbIndex((prev) => (prev + 1) % HERO_VERBS.length);
    }, 3000);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });

    // Track mouse position for glow effect on feature cards
    const handleMouse = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouse);
      observerRef.current?.disconnect();
    };
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
          <div className="nav__logo" style={{ color: "var(--accent-1)" }}>
            Athena
          </div>
          <ul className="nav__links">
            <li>
              <a className="nav__link" href="#features">Features</a>
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
        <section className="hero" id="hero" style={{ paddingBottom: "2rem" }}>
          <div style={{ marginBottom: "0rem" }}>
            <Image src="/athenalogoblackgold.png" alt="Athena Logo" width={800} height={300} style={{ objectFit: 'contain' }} priority />
          </div>

          <h1 className="hero__title" style={{ minHeight: "2.2em" }}>
            <span style={{ display: "inline-block", transition: "opacity 0.5s", opacity: 1 }} key={verbIndex}>
              {HERO_VERBS[verbIndex]}
            </span>
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
                backendStatus === "offline" ? "hero__status-dot--offline" : ""
              }`}
            />
            {backendStatus === "checking" && "Checking backend…"}
            {backendStatus === "online" && "Backend connected — API live"}
            {backendStatus === "offline" && "Backend offline — start Django server"}
          </div>

          {/* ── Mock UI Window ── */}
          <div className="mock-ui">
            <div className="mock-ui__header">
              <span className="mock-ui__dot" />
              <span className="mock-ui__dot" />
              <span className="mock-ui__dot" />
            </div>
            <div className="mock-ui__body">
              <div className="mock-ui__sidebar">
                <div className="mock-ui__skeleton-block">
                  <div className="mock-ui__skeleton-title" />
                  <div className="mock-ui__skeleton-line" />
                  <div className="mock-ui__skeleton-line" />
                  <div className="mock-ui__skeleton-line short" />
                </div>
                <div className="mock-ui__skeleton-block" style={{ opacity: 0.5 }}>
                  <div className="mock-ui__skeleton-title" />
                  <div className="mock-ui__skeleton-line" />
                  <div className="mock-ui__skeleton-line short" />
                </div>
                <div className="mock-ui__skeleton-block" style={{ opacity: 0.3 }}>
                  <div className="mock-ui__skeleton-title" />
                  <div className="mock-ui__skeleton-line" />
                </div>
              </div>
              <div className="mock-ui__main">
                <div className="mock-ui__chat-bubble mock-ui__chat-bubble--user">
                  Can you summarize the key findings from the uploaded research papers on quantum computing?
                </div>
                <div className="mock-ui__chat-bubble mock-ui__chat-bubble--ai">
                  Based on the 3 documents provided, the main breakthrough is the demonstration of fault-tolerant quantum error correction. The authors achieved a logical error rate lower than the physical error rate...
                </div>
                <div className="mock-ui__input-area">
                  <div className="mock-ui__input">
                    <span>Ask Athena about your documents...</span>
                    <div className="mock-ui__input-btn">↑</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Banner ── */}
        <section className="trust-banner">
          <p className="trust-banner__text">Built for modern minds everywhere</p>
          <div className="trust-banner__logos-wrapper">
            <div className="trust-banner__logos">
              {/* Duplicate list for seamless scrolling */}
              {[...Array(2)].map((_, i) => (
                <div key={i} style={{ display: "flex", gap: "5rem" }}>
                  <div className="trust-banner__logo">Research Labs</div>
                  <div className="trust-banner__logo">Universities</div>
                  <div className="trust-banner__logo">Data Scientists</div>
                  <div className="trust-banner__logo">Open Source</div>
                  <div className="trust-banner__logo">Innovators</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="features" id="features">
          <div className="features__header animate-on-scroll">
            <p className="features__label">Capabilities</p>
            <h2 className="features__title">
              Everything you need to understand anything
            </h2>
          </div>

          <div className="features__grid">
            {FEATURES.map((f, i) => (
              <article
                className="feature-card animate-on-scroll"
                style={{ transitionDelay: `${i * 0.1}s` }}
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
            <li><span className="footer__link">Docs</span></li>
            <li><span className="footer__link">Privacy</span></li>
          </ul>
        </footer>
      </div>
    </>
  );
}
