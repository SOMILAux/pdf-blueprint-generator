import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Aria profile" },
      { name: "description", content: "Manage your Aria assistant preferences." },
      { property: "og:title", content: "Your Aria profile" },
      { property: "og:description", content: "Manage your Aria assistant preferences." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <div className="min-h-screen pb-24 px-5 py-10" style={{ background: "#0a1a3f" }}>
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <User className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: "Sono, sans-serif" }}>
              Your profile
            </h1>
            <p className="text-sm text-white/60">Preferences saved on this device.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/80">
          Aria doesn't store your data on a server. Onboarding answers live in your browser only.
        </div>
      </div>
    </div>
  );
}
