import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Aria" },
      { name: "description", content: "Manage your Aria preferences." },
      { property: "og:title", content: "Settings — Aria" },
      { property: "og:description", content: "App preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const reset = () => {
    localStorage.removeItem("aria.onboarded.v1");
    localStorage.removeItem("aria.tasks.v1");
    navigate({ to: "/" });
  };
  return (
    <div className="min-h-screen px-4 py-6 text-white" style={{ background: "#04122e" }}>
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="font-medium">Onboarding</h2>
          <p className="mt-1 text-sm text-white/60">
            Re-run the prepping screen to change your setup answers.
          </p>
          <button
            onClick={reset}
            className="mt-3 rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/5"
          >
            Reset & restart
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="font-medium">About</h2>
          <p className="mt-1 text-sm text-white/60">
            Aria is a productivity assistant. No accounts, no databases — everything stays on
            your device.
          </p>
        </div>
      </div>
    </div>
  );
}
