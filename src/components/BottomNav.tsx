import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Plus, Sparkles, User } from "lucide-react";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/planner", icon: Plus, label: "Add task" },
  { to: "/chat", icon: Sparkles, label: "AI tools" },
  { to: "/profile", icon: User, label: "Profile" },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/" || path === "/onboarding") return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-white/10 bg-[#0b1230]/95 backdrop-blur-xl px-4"
      style={{ height: 56 }}
    >
      {items.map((it) => {
        const active = path === it.to;
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors ${
              active ? "text-[#2354DE]" : "text-white/70 hover:text-white"
            }`}
          >
            <it.icon className="h-5 w-5" />
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
