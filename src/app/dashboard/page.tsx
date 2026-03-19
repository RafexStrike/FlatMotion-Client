"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createAnimation } from "@/lib/api";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; data?: any; error?: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const res = await createAnimation(prompt);
      setResult({ success: true, data: res });
      setPrompt("");
    } catch (err: any) {
      console.error(err);
      setResult({ success: false, error: err.message || "Failed to generate animation" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name || "Creator"}! 👋</h1>
        <p className="text-gray-400">What do you want to animate today?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Generator */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Generate Animation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter prompt to generate animation
                </label>
                <textarea
                  className="w-full h-32 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="A cute robotic cat dancing in a futuristic cyberpunk city..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-all flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                  {isGenerating ? "Generating..." : "Generate ✨"}
                </button>
              </div>

              {/* Status Message */}
              {result && (
                <div className={`mt-4 p-4 rounded-xl border ${result.success ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                  {result.success ? (
                    <div>
                      <p className="font-medium mb-1">Animation request sent!</p>
                      <pre className="text-xs overflow-x-auto opacity-70">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p>{result.error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-1">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 h-full min-h-[400px]">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your Animations
            </h2>
            
            <div className="flex flex-col items-center justify-center h-[250px] text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No animations yet</p>
              <p className="text-sm text-gray-500 mt-1">Generate your first one to see it here</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
