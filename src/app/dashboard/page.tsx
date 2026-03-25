// File: client/src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAIChat } from '@/hooks/useAIChat';
import ProjectSidebar from '@/components/ai/ProjectSidebar';
import ChatTopBar from '@/components/ai/ChatTopBar';
import ChatCanvas from '@/components/ai/ChatCanvas';
import ChatComposer from '@/components/ai/ChatComposer';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const {
    providers, providersLoading,
    models,    modelsLoading,
    provider, setProvider,
    model,    setModel,
    apiKey,   setApiKey,
    prompt,   setPrompt,
    messages,
    loading, error, canGenerate,
    generate,
  } = useAIChat();

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading Dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#0a0a0d]">
      {/* Left sidebar */}
      <ProjectSidebar user={user} />

      {/* Main panel */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <ChatTopBar />

        {/* Scrollable canvas */}
        <ChatCanvas
          messages={messages}
          loading={loading}
          error={error}
          userName={user.name ?? 'You'}
        />

        {/* Composer */}
        <ChatComposer
          providers={providers}
          providersLoading={providersLoading}
          models={models}
          modelsLoading={modelsLoading}
          provider={provider}
          onProviderChange={setProvider}
          model={model}
          onModelChange={setModel}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={generate}
          canGenerate={canGenerate}
          loading={loading}
        />
      </div>
    </div>
  );
}
