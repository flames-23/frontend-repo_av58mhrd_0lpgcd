import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroCover from './components/HeroCover';
import HeaderBar from './components/HeaderBar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FooterNote from './components/FooterNote';

function useLocalTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('hibi_tasks');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('hibi_tasks', JSON.stringify(tasks));
  }, [tasks]);

  return [tasks, setTasks];
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [tasks, setTasks] = useLocalTasks();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const addTask = ({ title, priority }) => {
    const now = Date.now();
    setTasks((prev) => [
      { id: crypto.randomUUID(), title, priority, done: false, createdAt: now, updatedAt: now },
      ...prev,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done, updatedAt: Date.now() } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id) => {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    const next = window.prompt('Edit task', t.title);
    if (next == null) return;
    const title = next.trim();
    if (!title) return;
    setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, title, updatedAt: Date.now() } : x)));
  };

  const sorted = useMemo(() => {
    const p = { high: 0, normal: 1, low: 2 };
    return [...tasks].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1; // incomplete first
      if (p[a.priority] !== p[b.priority]) return p[a.priority] - p[b.priority];
      return b.createdAt - a.createdAt;
    });
  }, [tasks]);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased dark:bg-black dark:text-white">
      <HeaderBar dark={dark} onToggleTheme={() => setDark((v) => !v)} />
      <HeroCover />

      <main className="mx-auto -mt-12 w-full max-w-3xl space-y-4 px-6 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-labelledby="tasks-heading"
          className="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80"
        >
          <h2 id="tasks-heading" className="sr-only">Tasks</h2>
          <TaskInput onAdd={addTask} />
          <div className="mt-3">
            <TaskList items={sorted} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
          </div>
        </motion.section>
      </main>

      <FooterNote />
    </div>
  );
}
