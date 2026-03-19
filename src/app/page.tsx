"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    return <div className="min-h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  // To prevent flash of landing page while redirecting
  if (user) {
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
      <section className="w-full flex-col flex items-center justify-center text-center px-4 py-24 sm:py-32">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
          Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">2D animations</span> with AI
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          The fastest way to turn your prompts into stunning 2D animations. No complex software, just pure creativity powered by modern AI models.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/login" className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 text-center w-full sm:w-auto">
            Get Started Free
          </Link>
          <a href="#features" className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-all text-center w-full sm:w-auto">
            See Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Why choose FlatMotion?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-secondary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-2xl mb-6">✨</div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-gray-400 leading-relaxed">Turn your text prompts into animations in seconds, not hours. Our optimized pipeline ensures near real-time generation.</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-secondary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center text-2xl mb-6">🎨</div>
            <h3 className="text-xl font-semibold mb-3">Stunning Quality</h3>
            <p className="text-gray-400 leading-relaxed">Leverage state-of-the-art models for crisp, fluid 2D animations that look handcrafted by professional artists.</p>
          </div>

          <div className="p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-secondary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-6">🛠️</div>
            <h3 className="text-xl font-semibold mb-3">Developer Ready</h3>
            <p className="text-gray-400 leading-relaxed">Export to raw video formats, GIFs, or integrate directly with our clean REST API for your own applications.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-24 mb-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to bring your ideas to life?</h2>
          <p className="text-xl text-gray-400 mb-10">Join thousands of creators using FlatMotion to speed up their workflow.</p>
          <Link href="/login" className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:scale-105 inline-block">
            Start Generating Now
          </Link>
        </div>
      </section>
    </div>
  );
}
