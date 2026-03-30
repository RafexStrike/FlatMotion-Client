"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackgroundShader from "@/components/BackgroundShader";

/**
 * Redesigned LandingPage to match the AI Animation Studio aesthetic.
 * Integrates an animated shader background and a modern, high-impact Hero section.
 */
export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030303]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // To prevent flash of landing page while redirecting
  if (user) {
    return null; 
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* Dynamic Background */}
      <BackgroundShader />

      <main className="flex-grow w-full flex flex-col items-center">
        {/* Hero Section - Redesigned to match reference */}
        <section className="w-full max-w-7xl mx-auto px-4 pt-32 pb-20 sm:pt-48 sm:pb-32 flex flex-col items-center text-center">
          {/* Engine Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-8 animate-fade-in shadow-2xl backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-secondary uppercase opacity-80">
               AI-Powered Motion Engine
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-white mb-8 max-w-5xl leading-[1.05] font-outfit">
            Generate 2D <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] animate-pulse">animations</span> <br className="hidden md:block" /> with AI
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-medium opacity-80">
            Transform your static ideas into fluid motion code in seconds. The kinetic canvas for developers and designers who value speed without compromising on craft.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link 
              href="/login" 
              className="group relative w-full sm:w-auto px-10 py-4.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all hover:scale-105 active:scale-95 text-center overflow-hidden"
            >
              <span className="relative z-10">Start Generating Now</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </Link>
            {/* "Explore Templates" button omitted as per user instructions */}
          </div>
        </section>

        {/* Existing Sections styled to match new theme */}
        
        {/* Features Section */}
        <section id="features" className="w-full max-w-7xl mx-auto px-4 py-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">Why choose FlatMotion?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all hover:translate-y-[-4px] backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center text-2xl mb-6 shadow-inner">✨</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">Turn your text prompts into animations in seconds, not hours. Our optimized pipeline ensures near real-time generation.</p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-secondary/30 transition-all hover:translate-y-[-4px] backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center text-2xl mb-6 shadow-inner">🎨</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Stunning Quality</h3>
              <p className="text-gray-400 leading-relaxed">Leverage state-of-the-art models for crisp, fluid 2D animations that look handcrafted by professional artists.</p>
            </div>

            <div className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all hover:translate-y-[-4px] backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-6 shadow-inner">🛠️</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Developer Ready</h3>
              <p className="text-gray-400 leading-relaxed">Export to raw video formats, GIFs, or integrate directly with our clean REST API for your own applications.</p>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-24">
          <div className="relative p-12 sm:p-20 rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white relative z-10">How FlatMotion Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl text-3xl">
                  📝
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">1. Describe your idea</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs block mx-auto">
                  Type a prompt describing the animation you want to see. The more descriptive, the better the result.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(124,58,237,0.2)] text-3xl">
                  🤖
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">2. AI generates code</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs block mx-auto">
                  Our backend translates your prompt into precise Manim Python code instantly.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl text-3xl">
                  🎬
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">3. Watch it render</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs block mx-auto">
                  The scene is rendered server-side and shipped straight back to your dashboard as an MP4 video.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 relative overflow-hidden bg-white/[0.01]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Ready to bring your ideas to life?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">Join thousands of creators using FlatMotion to speed up their workflow.</p>
            <Link href="/login" className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 inline-block">
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 flex flex-col items-center text-center text-gray-500 text-sm bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-bold text-xl tracking-tighter text-white">FlatMotion</span>
        </div>
        <div className="flex gap-8 mb-8 text-gray-400">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} FlatMotion. All rights reserved.</p>
      </footer>
    </div>
  );
}
