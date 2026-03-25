// File: client/src/components/ai/ChatTopBar.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
}

export default function ChatTopBar({ title = 'Bouncing Ball Test' }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.07] bg-[#0f0f12] flex-shrink-0">
      {/* Left: title + status */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-white">{title}</h1>
        <Badge
          variant="outline"
          className="gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 border-emerald-400/20 rounded-full px-2.5 py-0.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Ready
        </Badge>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-2">
        {['Rename', 'Export', 'Delete'].map((label) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            className="text-xs font-medium text-gray-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] px-3 transition-all"
          >
            {label}
          </Button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
              'ml-1 text-gray-400 hover:text-white hover:bg-white/[0.05]'
            )}
          >
            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white">Pin Project</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white">Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white text-red-400 focus:text-red-400">Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

