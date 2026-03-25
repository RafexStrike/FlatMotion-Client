// File: client/src/components/ai/ProjectSidebar.tsx
'use client';

import { User } from '@/components/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, ChevronRight, SquarePen, Copy } from 'lucide-react';

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
  const userInitials = (user.name?.[0] ?? 'U').toUpperCase();

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full bg-[#0d0d0f] border-r border-white/[0.07]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold tracking-tight">F~</span>
        </div>
        <span className="font-semibold text-white text-sm">FlatMotion</span>
      </div>
      <Separator className="bg-white/[0.07]" />

      {/* New Animation */}
      <div className="px-4 pt-4 pb-3">
        <Button
          className="w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.25)] border-none h-10 rounded-xl"
        >
          <Plus className="mr-1 size-4" strokeWidth={2.5} />
          New Animation
        </Button>
      </div>

      {/* Project list */}
      <div className="px-4 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1 flex items-center justify-between">
          PROJECTS
          <ChevronRight className="size-3.5 text-gray-600" />
        </p>
        <ul className="space-y-0.5">
          {DEMO_PROJECTS.map((p) => (
            <li key={p.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-3 py-6 h-auto rounded-lg text-sm transition-all text-left block ${
                  p.active
                    ? 'bg-white/[0.08] text-white font-medium hover:bg-white/[0.1]'
                    : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                }`}
              >
                <span className="block truncate">{p.title}</span>
                <span className="block text-[11px] text-gray-500 mt-0.5 font-normal">Last opened</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      <Separator className="bg-white/[0.07]" />

      {/* User strip */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar className="size-8 border-none bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]">
          <AvatarFallback className="bg-transparent text-white text-xs font-bold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{user.name}</p>
          <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
        </div>
        <div className="flex gap-1 text-gray-500">
          <Button variant="ghost" size="icon-xs" className="text-gray-500 hover:text-gray-300 hover:bg-transparent">
            <SquarePen className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs" className="text-gray-500 hover:text-gray-300 hover:bg-transparent">
            <Copy className="size-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

