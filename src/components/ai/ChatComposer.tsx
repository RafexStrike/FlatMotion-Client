// File: client/src/components/ai/ChatComposer.tsx
'use client';

import { KeyboardEvent } from 'react';
import { ProviderOption, ModelOption } from '@/hooks/useAIChat';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Zap, Database, Cpu, KeyRound } from 'lucide-react';

interface Props {
  // provider/model/key
  providers: ProviderOption[];
  providersLoading: boolean;
  models: ModelOption[];
  modelsLoading: boolean;
  provider: string;
  onProviderChange: (v: string) => void;
  model: string;
  onModelChange: (v: string) => void;
  // prompt
  prompt: string;
  onPromptChange: (v: string) => void;
  // actions
  onGenerate: () => void;
  canGenerate: boolean;
  loading: boolean;
}

export default function ChatComposer({
  providers, providersLoading,
  models, modelsLoading,
  provider, onProviderChange,
  model, onModelChange,
  prompt, onPromptChange,
  onGenerate, canGenerate, loading,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canGenerate) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-white/[0.07] bg-[#0f0f12] px-5 pt-3 pb-4">
      {/* Prompt textarea + generate button row */}
      <div className="flex gap-3 items-end">
        <Textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Describe the 2D animation you want to generate…"
          disabled={loading}
          className="flex-1 resize-none bg-[#18181d] border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus-visible:ring-[#7C3AED]/50 focus-visible:border-[#7C3AED]/30 transition-all disabled:opacity-50 leading-relaxed min-h-[80px]"
        />
        <Button
          onClick={onGenerate}
          disabled={!canGenerate}
          title={canGenerate ? 'Generate (⌘ Enter)' : 'Fill in provider, model, API key and prompt to generate'}
          className={`flex-shrink-0 flex items-center gap-2 px-5 py-6 rounded-xl text-sm font-semibold transition-all border-none ${
            canGenerate
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]'
              : 'bg-white/[0.05] text-gray-600 cursor-not-allowed border-white/[0.07]'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Generating
            </>
          ) : (
            <>
              <Zap className="size-4 fill-white" />
              Generate
            </>
          )}
        </Button>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3 mt-2.5">
        {/* Provider */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
            <Database className="size-3.5" />
            Provider
          </span>
          <Select value={provider} onValueChange={(v) => onProviderChange(v ?? '')}>
            <SelectTrigger
              disabled={providersLoading}
              className="bg-[#1a1a1f] border-white/[0.09] text-gray-300 text-xs rounded-lg h-8 px-2.5 min-w-[120px] focus:ring-[#7C3AED]/50 hover:border-white/20"
            >
              <SelectValue placeholder={providersLoading ? 'Loading…' : 'Select provider'} />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
              {providers.map((p) => (
                <SelectItem key={p.id} value={p.id} className="focus:bg-white/[0.05] focus:text-white">
                  {p.label || p.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium ml-1">
            <Cpu className="size-3.5" />
            Model
          </span>
          <Select value={model} onValueChange={(v) => onModelChange(v ?? '')}>
            <SelectTrigger
              disabled={!provider || modelsLoading}
              className="bg-[#1a1a1f] border-white/[0.09] text-gray-300 text-xs rounded-lg h-8 px-2.5 min-w-[140px] focus:ring-[#7C3AED]/50 hover:border-white/20"
            >
              <SelectValue placeholder={!provider ? 'Select provider first' : modelsLoading ? 'Loading…' : 'Select model'} />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
              {models.map((m) => (
                <SelectItem key={m.id} value={m.id} className="focus:bg-white/[0.05] focus:text-white">
                  {m.label || m.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hint */}
        <span className="ml-auto text-[10px] text-gray-600 hidden sm:block">
          ⌘ Enter to generate
        </span>
      </div>
    </div>
  );
}

