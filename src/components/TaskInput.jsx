import React, { useState, useId } from 'react';
import { Plus } from 'lucide-react';

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('normal');
  const inputId = useId();

  const submit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, priority });
    setTitle('');
    setPriority('normal');
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <label htmlFor={inputId} className="sr-only">Add a task</label>
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task and press Enter…"
          className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-black dark:text-white"
          aria-label="Task title"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-2.5 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-black dark:text-white"
          aria-label="Priority"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:ring-offset-black"
          aria-label="Add task"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </form>
  );
}
