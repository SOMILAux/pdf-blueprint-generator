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

const tools = [
  { to: "/email", icon: Mail, label: "Email generator" },
  { to: "/summarize", icon: FileText, label: "Meeting summarizer" },
  { to: "/planner", icon: CalendarCheck, label: "Task planner" },
  { to: "/research", icon: Search, label: "Research assistant" },
  { to: "/chat", icon: MessagesSquare, label: "AI chat" },
] as const;

const extras = [
  { to: "/dashboard", icon: History, label: "History" },
  { to: "/dashboard", icon: Flag, label: "Priority" },
  { to: "/dashboard", icon: Settings, label: "Settings" },
  { to: "/dashboard", icon: LifeBuoy, label: "Help & support" },
] as const;

export function AriaSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-72 border-r border-white/10 bg-[#0b1230] p-5 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg" style={{ background: "linear-gradient(135deg,#0f2a4a,#0f4a3a)" }} />
            <span className="text-lg font-semibold text-white" style={{ fontFamily: "Sono, sans-serif" }}>
              Aria
            </span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-2 text-[11px] uppercase tracking-widest text-white/40">AI tools</p>
        <nav className="mb-6 space-y-1">
          {tools.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </Link>
          ))}
        </nav>

        <p className="mb-2 text-[11px] uppercase tracking-widest text-white/40">Workspace</p>
        <nav className="space-y-1">
          {extras.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/10"
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
