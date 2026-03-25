// File: client/src/components/ai/ChatComposer.tsx
'use client';

import { KeyboardEvent } from 'react';
import { ProviderOption, ModelOption } from '@/hooks/useAIChat';

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

const selectClass =
  'bg-[#1a1a1f] border border-white/[0.09] text-gray-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 cursor-pointer hover:border-white/20 transition-all appearance-none pr-6 bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236B7280\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_8px_center]';

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
    <div className="flex-shrink-0 border-t border-white/[0.07] bg-[#0f0f12] px-5 pt-3 pb-4">
      {/* Prompt textarea + generate button row */}
      <div className="flex gap-3 items-end">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          placeholder="Describe the 2D animation you want to generate…"
          disabled={loading}
          className="flex-1 resize-none bg-[#18181d] border border-white/[0.09] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED]/30 transition-all disabled:opacity-50 leading-relaxed"
        />
        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          title={canGenerate ? 'Generate (⌘ Enter)' : 'Fill in provider, model, API key and prompt to generate'}
          className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
            canGenerate
              ? 'bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]'
              : 'bg-white/[0.05] text-gray-600 cursor-not-allowed border border-white/[0.07]'
          }`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating
            </>
          ) : (
            'Generate'
          )}
        </button>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3 mt-2.5">
        {/* Provider icon label */}
        <span className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Provider
        </span>

        {/* Provider select */}
        <select
          value={provider}
          onChange={(e) => onProviderChange(e.target.value)}
          disabled={providersLoading}
          className={selectClass}
        >
          <option value="">
            {providersLoading ? 'Loading…' : 'Select provider'}
          </option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label || p.id}
            </option>
          ))}
        </select>

        {/* Model label */}
        <span className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium ml-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
          </svg>
          Model
        </span>

        {/* Model select */}
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          disabled={!provider || modelsLoading}
          className={selectClass}
        >
          <option value="">
            {!provider ? 'Select provider first' : modelsLoading ? 'Loading…' : 'Select model'}
          </option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label || m.id}
            </option>
          ))}
        </select>

        {/* API Key */}
        <div className="flex items-center gap-1.5 ml-1">
          <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="API Key"
            autoComplete="off"
            className="bg-[#1a1a1f] border border-white/[0.09] text-gray-300 text-xs rounded-lg px-2.5 py-1.5 w-36 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 placeholder-gray-700 hover:border-white/20 transition-all"
          />
        </div>

        {/* Hint */}
        <span className="ml-auto text-[10px] text-gray-600 hidden sm:block">
          ⌘ Enter to generate
        </span>
      </div>
    </div>
  );
}
