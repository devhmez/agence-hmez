"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
export function FutureEffects({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const pathname = usePathname();
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let x = 50,
      y = 25;
    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${distance > 0 ? window.scrollY / distance : 0})`;
      if (!preference.matches && !pausedRef.current) {
        element.style.setProperty("--pointer-x", `${x}%`);
        element.style.setProperty("--pointer-y", `${y}%`);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const pointer = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        preference.matches ||
        pausedRef.current
      )
        return;
      x = (event.clientX / window.innerWidth) * 100;
      y = (event.clientY / window.innerHeight) * 100;
      schedule();
    };
    const configure = () => {
      observer?.disconnect();
      element
        .querySelectorAll(".future-reveal")
        .forEach((node) => node.classList.remove("future-reveal"));
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.add("future-reveal");
              observer?.unobserve(entry.target);
            }
        },
        { threshold: 0.08 },
      );
      element
        .querySelectorAll(
          "main section:not(.agency-hero), .demo-card, .process-grid article, .treatment-card, .page-intro",
        )
        .forEach((node) => observer?.observe(node));
    };
    configure();
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("pointermove", pointer, { passive: true });
    preference.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", pointer);
      preference.removeEventListener("change", configure);
    };
  }, [pathname]);
  return (
    <div className="future-shell" ref={root} data-motion-paused={paused}>
      <div className="future-atmosphere" aria-hidden="true">
        <span className="future-aurora future-aurora-one" />
        <span className="future-aurora future-aurora-two" />
        <span className="future-grid" />
      </div>
      <div
        className="future-scroll-progress"
        ref={progress}
        aria-hidden="true"
      />
      {children}
      <button
        type="button"
        className="future-motion-control"
        aria-pressed={paused}
        aria-label={
          paused ? "Reprendre les animations" : "Mettre les animations en pause"
        }
        title={
          paused ? "Reprendre les animations" : "Mettre les animations en pause"
        }
        onClick={() => {
          pausedRef.current = !paused;
          setPaused(!paused);
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >
          {paused ? (
            <path d="M8 5v14l11-7z" />
          ) : (
            <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
          )}
        </svg>
        <span>{paused ? "Reprendre" : "Pause"}</span>
      </button>
    </div>
  );
}
