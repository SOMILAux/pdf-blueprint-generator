import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aria — Launching" },
      { name: "description", content: "Aria is your AI workplace productivity assistant." },
      { property: "og:title", content: "Aria" },
      { property: "og:description", content: "AI workplace productivity assistant." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"logo" | "name">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 700);
    const t2 = setTimeout(() => {
      const onboarded = typeof window !== "undefined" && localStorage.getItem("aria.onboarded.v1");
      navigate({ to: onboarded ? "/dashboard" : "/prepping" });
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(45deg, #04070F 0%, #04070F 35%, #0b3d2e 65%, #17a374 100%)",
        backgroundSize: "200% 200%",
        animation: "aria-bg 4s ease-in-out infinite alternate",
      }}
    >
      <style>{`
        @keyframes aria-bg {
          0% { background-position: 0% 100%; }
          100% { background-position: 100% 0%; }
        }
        @keyframes aria-pop {
          0% { transform: scale(0.4); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes aria-slide {
          0% { transform: translateX(-24px); opacity: 0; letter-spacing: -0.4em; }
          100% { transform: translateX(0); opacity: 1; letter-spacing: 0.06em; }
        }
      `}</style>
      <div className="flex items-center gap-4">
        <div
          className="h-24 w-24 shadow-2xl"
          style={{
            borderRadius: 26,
            background: "linear-gradient(135deg, #0b3d2e 0%, #17a374 100%)",
            animation: "aria-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards",
            boxShadow: "0 20px 60px -10px rgba(23,163,116,0.5)",
          }}
        />
        {phase === "name" && (
          <span
            className="text-6xl text-white"
            style={{
              fontFamily: "Sono, monospace",
              fontWeight: 300,
              animation: "aria-slide 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
              display: "inline-block",
            }}
          >
            Aria
          </span>
        )}
      </div>
    </div>
  );
}
