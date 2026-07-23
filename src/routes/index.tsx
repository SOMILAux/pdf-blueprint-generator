import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aria — AI Workplace Assistant" },
      { name: "description", content: "Launching Aria, your AI workplace productivity assistant." },
      { property: "og:title", content: "Aria — AI Workplace Assistant" },
      { property: "og:description", content: "Launching Aria, your AI workplace productivity assistant." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 350);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => {
      const onboarded = typeof window !== "undefined" && localStorage.getItem("aria_onboarded") === "1";
      navigate({ to: onboarded ? "/dashboard" : "/onboarding" });
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(45deg, #04122b 0%, #0a2a4a 35%, #0f4a3a 70%, #145d3c 100%)",
        backgroundSize: "200% 200%",
        animation: "ariaBgShift 6s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes ariaBgShift {
          0% { background-position: 0% 100%; }
          100% { background-position: 100% 0%; }
        }
        @keyframes ariaLogoPop {
          0% { transform: scale(0.2); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ariaSlideOut {
          0% { transform: translateX(-40px); opacity: 0; letter-spacing: -0.1em; }
          100% { transform: translateX(0); opacity: 1; letter-spacing: 0.02em; }
        }
      `}</style>

      <div className="flex items-center gap-5">
        <div
          className="relative flex h-24 w-24 items-center justify-center rounded-3xl shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            animation: phase >= 0 ? "ariaLogoPop 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards" : undefined,
            boxShadow: "0 0 60px rgba(35,84,222,0.35)",
          }}
        >
          <div
            className="h-12 w-12 rounded-xl"
            style={{ background: "linear-gradient(135deg,#2354DE,#0f4a3a)" }}
          />
        </div>

        {phase >= 1 && (
          <span
            className="overflow-hidden text-6xl text-white"
            style={{
              fontFamily: "Sono, sans-serif",
              fontWeight: 300,
              animation: "ariaSlideOut 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          >
            Aria
          </span>
        )}
      </div>

      {phase >= 2 && (
        <div className="absolute bottom-16 text-xs uppercase tracking-[0.4em] text-white/60">
          loading
        </div>
      )}
    </div>
  );
}
