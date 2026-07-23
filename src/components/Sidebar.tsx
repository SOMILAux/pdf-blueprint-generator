import { Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  CalendarCheck,
  Search,
  MessagesSquare,
  History,
  Flag,
  Settings,
  LifeBuoy,
  X,
} from "lucide-react";

const groups = [
  {
    label: "AI Tools",
    items: [
      { to: "/email", label: "Email Generator", icon: Mail },
      { to: "/summarize", label: "Meeting Summarizer", icon: FileText },
      { to: "/planner", label: "Task Planner", icon: CalendarCheck },
      { to: "/research", label: "Research Assistant", icon: Search },
      { to: "/chat", label: "AI Chat", icon: MessagesSquare },
    ],
  },
  {
    label: "Workspace",
    items: [
      { to: "/history", label: "History", icon: History },
      { to: "/priority", label: "Priority", icon: Flag },
      { to: "/settings", label: "Settings", icon: Settings },
      { to: "/help", label: "Help & Support", icon: LifeBuoy },
    ],
  },
] as const;

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r border-white/10 bg-[#050912] transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg"
              style={{ background: "linear-gradient(135deg,#04070F 0%, #0f6b47 100%)" }}
            />
            <span style={{ fontFamily: "Sono, monospace", fontWeight: 300 }} className="text-lg text-white">
              Aria
            </span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-6 p-4">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-widest text-white/40">
                {g.label}
              </p>
              <ul className="space-y-1">
                {g.items.map((it) => (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                    >
                      <it.icon className="h-4 w-4" />
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
