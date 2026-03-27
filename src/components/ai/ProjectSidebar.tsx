// File: client/src/components/ai/ProjectSidebar.tsx
'use client';

import { useState } from 'react';
import { User, useAuth } from '@/components/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, ChevronRight, SquarePen, Copy, Trash2 } from 'lucide-react';
import { Project } from '@/hooks/useProjects';
import ProjectCreateDialog from './ProjectCreateDialog';

interface Props {
  user: User;
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  onAddProject: (title: string, description: string) => Promise<void>;
  onRemoveProject: (id: string) => Promise<void>;
}

export default function ProjectSidebar({ 
  user, projects, selectedProjectId, onSelectProject, onAddProject, onRemoveProject 
}: Props) {
  const { logout } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const userInitials = (user.name?.[0] ?? 'U').toUpperCase();

  const handleCreateProject = async (title: string, description: string) => {
    setIsCreating(true);
    try {
      await onAddProject(title, description);
    } finally {
      setIsCreating(false);
    }
  };

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

      {/* New Project Dialog */}
      <div className="px-4 pt-4 pb-3">
        <ProjectCreateDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateProject}
          loading={isCreating}
        >
          <Button
            className="w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.25)] border-none h-10 rounded-xl"
          >
            <Plus className="mr-1 size-4" strokeWidth={2.5} />
            New Project
          </Button>
        </ProjectCreateDialog>
      </div>

      {/* Project list */}
      <div className="px-4 pb-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1 flex items-center justify-between">
          PROJECTS
          <ChevronRight className="size-3.5 text-gray-600" />
        </p>
        {projects.length === 0 ? (
          <p className="text-xs text-center text-gray-500 py-4 px-2">No projects yet. Create one to start animating!</p>
        ) : (
          <ul className="space-y-0.5">
            {projects.map((p) => {
              const active = p.id === selectedProjectId;
              return (
                <li key={p.id} className="group flex items-center">
                  <Button
                    onClick={() => onSelectProject(p.id)}
                    variant="ghost"
                    title={p.title}
                    className={`w-full justify-start px-3 py-6 h-auto rounded-lg text-sm transition-all text-left block flex-1 ${
                      active
                        ? 'bg-white/[0.08] text-white font-medium hover:bg-white/[0.1]'
                        : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                    }`}
                  >
                    <span className="block truncate">{p.title}</span>
                    <span className="block text-[10px] text-gray-500 mt-0.5 font-normal truncate">
                      {p.description || 'No description'}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onRemoveProject(p.id); }}
                    className="h-8 w-8 ml-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all rounded-md"
                    title="Delete Project"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      <Separator className="bg-white/[0.07]" />

      {/* User strip */}
      <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors" onClick={logout}>
        <Avatar className="size-8 border-none bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]">
          <AvatarFallback className="bg-transparent text-white text-xs font-bold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white truncate">{user.name}</p>
          <p className="text-[10px] text-gray-500 truncate">Log out</p>
        </div>
      </div>
    </aside>
  );
}

