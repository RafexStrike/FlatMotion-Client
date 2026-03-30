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
  apiKey: string;
  onApiKeyChange: (v: string) => void;
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
  apiKey, onApiKeyChange,
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
    <div className="flex-shrink-0 border-t border-white/[0.07] bg-[#0f0f12] px-0 pt-4 sm:pt-5 pb-4 sm:pb-6 overflow-x-hidden w-full">
      {/* Centered composer container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:gap-5">
        {/* Prompt textarea + generate button row */}
        <div className="flex flex-col sm:flex-row gap-3 items-end w-full">
          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Describe the 2D animation you want to generate…"
            disabled={loading}
            className="flex-1 resize-none bg-[#18181d] border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus-visible:ring-[#7C3AED]/50 focus-visible:border-[#7C3AED]/30 transition-all disabled:opacity-50 leading-relaxed min-h-[88px]"
          />
          <Button
            onClick={onGenerate}
            disabled={!canGenerate}
            title={canGenerate ? 'Generate (⌘ Enter)' : 'Fill in provider, model, API key and prompt to generate'}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border-none flex-shrink-0 h-[88px] sm:h-auto ${
              canGenerate
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]'
                : 'bg-white/[0.05] text-gray-600 cursor-not-allowed border-white/[0.07]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span className="hidden sm:inline">Generating</span>
              </>
            ) : (
              <>
                <Zap className="size-4 fill-white" />
                <span className="hidden sm:inline">Generate</span>
              </>
            )}
          </Button>
        </div>

        {/* Controls row - stack on mobile */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 w-full overflow-x-auto pb-1">
          {/* Provider */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium whitespace-nowrap flex-shrink-0">
              <Database className="size-4" />
              <span className="hidden sm:inline">Provider</span>
            </span>
            <Select value={provider} onValueChange={(v) => onProviderChange(v ?? '')}>
              <SelectTrigger
                disabled={providersLoading}
                className="flex-1 sm:flex-none bg-[#1a1a1f] border-white/[0.09] text-gray-300 text-xs rounded-lg h-9 px-3 min-w-[110px] sm:min-w-[130px] focus:ring-[#7C3AED]/50 hover:border-white/20 border"
              >
                <SelectValue placeholder={providersLoading ? 'Loading…' : 'Provider'} />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
                {providers.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="focus:bg-white/[0.05] focus:text-white text-xs">
                    {p.label || p.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium whitespace-nowrap flex-shrink-0">
              <Cpu className="size-4" />
              <span className="hidden sm:inline">Model</span>
            </span>
            <Select value={model} onValueChange={(v) => onModelChange(v ?? '')}>
              <SelectTrigger
                disabled={!provider || modelsLoading}
                className="flex-1 sm:flex-none bg-[#1a1a1f] border-white/[0.09] text-gray-300 text-xs rounded-lg h-9 px-3 min-w-[110px] sm:min-w-[150px] focus:ring-[#7C3AED]/50 hover:border-white/20 border"
              >
                <SelectValue placeholder={!provider ? 'Select provider' : modelsLoading ? 'Loading…' : 'Model'} />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
                {models.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="focus:bg-white/[0.05] focus:text-white text-xs">
                    {m.label || m.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium flex-shrink-0">
              <KeyRound className="size-4" />
            </span>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="API Key (Optional)"
              autoComplete="off"
              className="flex-1 sm:w-36 lg:w-40 bg-[#1a1a1f] border-white/[0.09] text-gray-300 text-xs rounded-lg h-9 focus-visible:ring-[#7C3AED]/50 placeholder-gray-700 hover:border-white/20 transition-all border"
            />
          </div>

          {/* Hint */}
          <span className="text-xs text-gray-600 hidden sm:block flex-shrink-0 ml-auto">
            ⌘ Enter to generate
          </span>
        </div>
      </div>
    </div>
  );
}