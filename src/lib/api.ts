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
export const createAnimation = (prompt: string) => fetchApi('/animations', { method: 'POST', body: JSON.stringify({ prompt }) });

// AI endpoints
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
