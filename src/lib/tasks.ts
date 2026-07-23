import { useEffect, useState, useCallback } from "react";

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "high" | "low";
  createdAt: string; // ISO
  dueAt?: string; // ISO
};

const KEY = "aria.tasks.v1";

const seed = (): Task[] => {
  const now = new Date();
  const iso = (d: Date) => d.toISOString();
  const plus = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    return iso(d);
  };
  return [
    { id: "t1", title: "Draft weekly team update email", description: "Summarize wins, blockers, and next steps for Friday send.", completed: true, priority: "high", createdAt: plus(-2), dueAt: plus(0) },
    { id: "t2", title: "Summarize Monday standup notes", description: "Extract decisions and action items.", completed: true, priority: "low", createdAt: plus(-1), dueAt: plus(0) },
    { id: "t3", title: "Prepare research brief on competitor pricing", description: "Compare 3 competitors and note positioning.", completed: false, priority: "high", createdAt: plus(-3), dueAt: plus(1) },
    { id: "t4", title: "Plan tomorrow's schedule", description: "Time-block focus work in the morning.", completed: false, priority: "low", createdAt: plus(-1), dueAt: plus(1) },
    { id: "t5", title: "Review Q3 roadmap draft", description: "Leave inline comments and flag risks.", completed: false, priority: "high", createdAt: plus(-4), dueAt: plus(2) },
  ];
};

function read(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const s = seed();
      localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function write(tasks: Task[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(tasks));
  window.dispatchEvent(new Event("aria.tasks.changed"));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(read());
    const onChange = () => setTasks(read());
    window.addEventListener("aria.tasks.changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("aria.tasks.changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const add = useCallback((t: Omit<Task, "id" | "createdAt" | "completed">) => {
    const next: Task = {
      ...t,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completed: false,
    };
    const all = [next, ...read()];
    write(all);
  }, []);

  const update = useCallback((id: string, patch: Partial<Task>) => {
    const all = read().map((t) => (t.id === id ? { ...t, ...patch } : t));
    write(all);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((t) => t.id !== id));
  }, []);

  const toggle = useCallback((id: string) => {
    const all = read().map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    write(all);
  }, []);

  return { tasks, add, update, remove, toggle };
}

export function getTaskById(id: string): Task | undefined {
  return read().find((t) => t.id === id);
}
