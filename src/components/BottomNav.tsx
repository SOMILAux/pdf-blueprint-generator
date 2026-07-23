import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Plus, Sparkles, User } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/task/new", label: "Add Task", icon: Plus },
  { to: "/tools", label: "AI Tools", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hide = pathname === "/" || pathname === "/prepping";
  if (hide) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a1226]/95 backdrop-blur-xl"
      style={{ height: 56 }}
    >
      <div className="mx-auto flex h-full max-w-xl items-center justify-around px-2">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[11px] transition-colors ${
                active ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <it.icon className="h-5 w-5" />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
