// File: client/src/lib/api.ts
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
}

export const loginUser = (credentials: any) => fetchApi('/auth/sign-in/email', { method: 'POST', body: JSON.stringify(credentials) });
export const registerUser = (userData: any) => fetchApi('/auth/sign-up/email', { method: 'POST', body: JSON.stringify(userData) });
export const getCurrentUser = () => fetchApi('/auth/me');


// AI provider endpoints
export const getAIProviders = () => fetchApi('/ai/providers');
export const getAIModels = (provider: string) => fetchApi(`/ai/models?provider=${encodeURIComponent(provider)}`);

export interface AIChatPayload {
  prompt: string;
  provider: string;
  model: string;
  apiKey: string;
  temperature?: number;
  systemPrompt?: string;
}

export const generateAIChat = (payload: AIChatPayload) =>
  fetchApi('/ai/chat', { method: 'POST', body: JSON.stringify(payload) });

// --- Project Endpoints ---
export interface CreateProjectPayload {
  title: string;
  description?: string;
  userId: string;
}

export const createProject = (payload: CreateProjectPayload) => 
  fetchApi('/projects', { method: 'POST', body: JSON.stringify(payload) });

export const getProjects = (userId: string) => 
  fetchApi(`/projects/user/${userId}`);

export const getProject = (projectId: string) => 
  fetchApi(`/projects/${projectId}`);

export const updateProject = (projectId: string, payload: { title?: string; description?: string }) => 
  fetchApi(`/projects/${projectId}`, { method: 'PATCH', body: JSON.stringify(payload) });

export const deleteProject = (projectId: string) => 
  fetchApi(`/projects/${projectId}`, { method: 'DELETE' });

// --- Animation Endpoints ---
export interface GenerateAnimationPayload {
  prompt: string;
  projectId: string;
  userId: string;
  provider: string;
  model: string;
  apiKey?: string;
}

export const generateAnimation = (payload: GenerateAnimationPayload) => 
  fetchApi('/animations/generate', { method: 'POST', body: JSON.stringify(payload) });

export const getAnimationJob = (jobId: string) => 
  fetchApi(`/animations/${jobId}`);

export const getProjectAnimations = (projectId: string) => 
  fetchApi(`/animations/project/${projectId}`);

export const deleteAnimationJob = (jobId: string) => 
  fetchApi(`/animations/${jobId}`, { method: 'DELETE' });

export const regenerateAnimationJob = (jobId: string) => 
  fetchApi(`/animations/${jobId}/regenerate`, { method: 'PATCH' });

