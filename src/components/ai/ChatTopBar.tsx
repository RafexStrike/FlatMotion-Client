// File: client/src/components/ai/ChatTopBar.tsx
'use client';

interface Props {
  title?: string;
}

export default function ChatTopBar({ title = 'Bouncing Ball Test' }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.07] bg-[#0f0f12] flex-shrink-0">
      {/* Left: title + status */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-white">{title}</h1>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Ready
        </span>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-2">
        {['Rename', 'Export', 'Delete'].map((label) => (
          <button
            key={label}
            className="text-xs font-medium text-gray-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg px-3 py-1.5 transition-all"
          >
            {label}
          </button>
        ))}
        <button className="ml-1 text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/[0.05]" title="More">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
