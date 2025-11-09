import React from 'react';
import { ListTodo, Settings, Sun, Moon } from 'lucide-react';

export default function HeaderBar({ dark, onToggleTheme }) {
  return (
    <header className={`sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${dark ? 'bg-black/60' : ''}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white">
            <ListTodo size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600">Hibi No ToDo's</p>
            <p className="text-xs text-gray-500">Daily focus, done right</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-md border border-transparent bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:ring-offset-black"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
          </button>
          <button
            aria-label="Settings"
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
