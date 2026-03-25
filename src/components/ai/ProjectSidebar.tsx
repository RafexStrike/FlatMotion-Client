// File: client/src/components/ai/ProjectSidebar.tsx
'use client';

import { User } from '@/components/AuthProvider';

const DEMO_PROJECTS = [
  { id: '1', title: 'Projectile Motion Explainer', active: false },
  { id: '2', title: 'Sine Wave Demo', active: false },
  { id: '3', title: 'Bouncing Ball Test', active: true },
  { id: '4', title: 'Geometry Lesson', active: false },
];

interface Props {
  user: User;
}

export default function ProjectSidebar({ user }: Props) {
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full bg-[#0d0d0f] border-r border-white/[0.07]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.07]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold tracking-tight">F~</span>
        </div>
        <span className="font-semibold text-white text-sm">FlatMotion</span>
      </div>

      {/* New Animation */}
      <div className="px-4 pt-4 pb-3">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(124,58,237,0.25)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Animation
        </button>
      </div>

      {/* Project list */}
      <div className="px-4 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1 flex items-center justify-between">
          PROJECTS
          <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </p>
        <ul className="space-y-0.5">
          {DEMO_PROJECTS.map((p) => (
            <li key={p.id}>
              <button
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                  p.active
                    ? 'bg-white/[0.08] text-white font-medium'
                    : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                }`}
              >
                <span className="block truncate">{p.title}</span>
                <span className="block text-[11px] text-gray-500 mt-0.5">Last opened</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User strip */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-white/[0.07]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {(user.name?.[0] ?? 'U').toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{user.name}</p>
          <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
        </div>
        <div className="flex gap-2 text-gray-500">
          <button className="hover:text-gray-300 transition-colors" title="Edit">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button className="hover:text-gray-300 transition-colors" title="Copy">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
