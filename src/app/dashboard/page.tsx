'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAnimationJobs } from '@/hooks/useAnimationJobs';
import ProjectSidebar from '@/components/ai/ProjectSidebar';
import ChatTopBar from '@/components/ai/ChatTopBar';
import ChatComposer from '@/components/ai/ChatComposer';
import GenerationHistory from '@/components/ai/GenerationHistory';
import EmptyState from '@/components/ai/EmptyState';
import { FolderPlus } from 'lucide-react';
import { getAIProviders, getAIModels } from '@/lib/api';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // state for composer providers/models
  const [providers, setProviders] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [provider, setProvider] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  const [loadingProviders, setLoadingProviders] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Hook states
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    addProject,
    removeProject
  } = useProjects();

  const {
    jobs,
    loading: jobsLoading,
    generate,
    regenerate,
    removeJob
  } = useAnimationJobs(selectedProjectId);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch Providers
  useEffect(() => {
    setLoadingProviders(true);
    getAIProviders()
      .then((res) => {
        const raw = res?.data ?? [];
        const options = Array.isArray(raw)
          ? raw.map((p: any) => (typeof p === 'string' ? { id: p, label: p } : p))
          : typeof raw === 'object'
          ? Object.keys(raw).map((k) => ({ id: k, label: k }))
          : [];
        setProviders(options);
        if (options.length > 0) setProvider(options[0].id);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoadingProviders(false));
  }, []);

  // Fetch Models
  useEffect(() => {
    if (!provider) { setModels([]); return; }
    setLoadingModels(true);
    getAIModels(provider)
      .then((res) => {
        const raw = res?.data ?? [];
        const options = Array.isArray(raw)
          ? raw.map((m: any) => (typeof m === 'string' ? { id: m, label: m } : m))
          : [];
        setModels(options);
        if (options.length > 0) setModel(options[0].id);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoadingModels(false));
  }, [provider]);

  // Generation Action
  const handleGenerate = async () => {
    if (!provider || !model || !prompt.trim() || !selectedProjectId) return;
    setIsGenerating(true);
    try {
      await generate(prompt, provider, model, apiKey || undefined);
      setPrompt('');
    } catch (err: any) {
      alert(err.message || 'Failed to generate animation');
    } finally {
      setIsGenerating(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-[#0a0a0d] via-[#0d0d12] to-[#0a0a0d]">
      {/* Left sidebar */}
      <ProjectSidebar
        user={user}
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onAddProject={addProject}
        onRemoveProject={removeProject}
      />

      {/* Main panel - centered container */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <ChatTopBar />

        {/* Content Area */}
        {selectedProjectId ? (
          <>
            {jobs.length === 0 && !jobsLoading ? (
               <EmptyState
                 title="No Animations Yet"
                 description="Enter a prompt below to generate your first 2D animation in this project."
                 icon={FolderPlus}
               />
            ) : (
              <GenerationHistory
                jobs={jobs}
                loading={jobsLoading}
                onDeleteJob={removeJob}
                onRegenerateJob={regenerate}
              />
            )}
          </>
        ) : (
          <EmptyState
            title="No Project Selected"
            description="Select a project from the sidebar or click 'New Project' to start generating animations."
            icon={FolderPlus}
          />
        )}

        {/* Composer */}
        {selectedProjectId && (
          <ChatComposer
            providers={providers}
            providersLoading={loadingProviders}
            models={models}
            modelsLoading={loadingModels}
            provider={provider}
            onProviderChange={setProvider}
            model={model}
            onModelChange={setModel}
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            prompt={prompt}
            onPromptChange={setPrompt}
            onGenerate={handleGenerate}
            canGenerate={Boolean(provider && model && prompt.trim() && !isGenerating)}
            loading={isGenerating}
          />
        )}
      </div>
    </div>
  );
}
