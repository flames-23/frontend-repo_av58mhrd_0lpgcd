import React from 'react';
import { CheckCircle2, Circle, Trash2, Edit3, ArrowUp, ArrowDown } from 'lucide-react';

function PriorityBadge({ level }) {
  const map = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    normal: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${map[level]}`}>
      {level === 'high' ? <ArrowUp size={12} /> : level === 'low' ? <ArrowDown size={12} /> : null}
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

export default function TaskList({ items, onToggle, onDelete, onEdit }) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-800 dark:text-gray-400">
        No tasks yet — add your first one above.
      </div>
    );
  }

  return (
    <ul className="space-y-2" role="list">
      {items.map((t) => (
        <li key={t.id} className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-black">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => onToggle(t.id)}
              aria-pressed={t.done}
              aria-label={t.done ? 'Mark as not done' : 'Mark as done'}
              className="text-blue-600 outline-none transition-transform focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {t.done ? <CheckCircle2 className="text-blue-600" /> : <Circle className="text-gray-400" />}
            </button>
            <div className="min-w-0">
              <p className={`truncate text-sm ${t.done ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>{t.title}</p>
              <div className="mt-1 flex items-center gap-2">
                <PriorityBadge level={t.priority} />
                {t.updatedAt && (
                  <span className="text-xs text-gray-400">Updated {new Date(t.updatedAt).toLocaleTimeString()}</span>
                )}
              </div>
            </div>
          </div>
          <div className="ml-3 flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => onEdit(t.id)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-900"
              aria-label="Edit task"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(t.id)}
              className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-900/20"
              aria-label="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
