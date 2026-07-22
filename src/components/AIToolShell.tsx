import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-bold gradient-text md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      {children}
      <p className="mt-8 text-xs text-muted-foreground">
        Responsible AI notice: outputs may contain errors or bias. Review before sending, publishing, or acting on them.
      </p>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function OutputPanel({ content, loading }: { content: string; loading: boolean }) {
  return (
    <div className="glass-card min-h-[240px] rounded-xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Output</span>
        {content && !loading && (
          <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="text-xs text-accent hover:underline"
          >
            Copy
          </button>
        )}
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      ) : content ? (
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{content}</pre>
      ) : (
        <p className="text-sm text-muted-foreground">Output will appear here.</p>
      )}
    </div>
  );
}

export function PrimaryButton({
  children,
  loading,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-glow)" }}
    >
      {loading ? "Generating…" : children}
    </button>
  );
}

export const inputCls =
  "w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
