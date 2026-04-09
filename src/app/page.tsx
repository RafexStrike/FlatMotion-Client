// client/src/app/page.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackgroundShader from "@/components/BackgroundShader";
import Image from "next/image";
import MathematicalAnimationsPreview from "@/components/MathematicalAnimationsPreview";
import FeatureShowcase from "@/components/FeatureShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatisticsSection from "@/components/StatisticsSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Mail, MapPin, Phone, Code, Globe, Heart, Send } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <LoadingSpinner size="lg" message="Loading FlatMotion..." />
      </div>
    );
  }

  // To prevent flash of landing page while redirecting
  if (user) {
    return null; 
  }

  return (
    // <div className="relative w-full bg-black">
    <div className="relative w-full ">

      {/* Dynamic Background */}
      <BackgroundShader />

      <main className="relative z-10 w-full">
   {/* HERO SECTION */}
<section className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-24 flex flex-col items-center text-center overflow-hidden">

  {/* Animated Math Layer */}
  <svg
    className="absolute inset-0 w-full h-full opacity-20"
    viewBox="0 0 1200 400"
    preserveAspectRatio="none"
  >
    {/* wave 1 */}
    <path
      d="M0 200 Q150 100 300 200 T600 200 T900 200 T1200 200"
      stroke="url(#heroGradient)"
      strokeWidth="2"
      fill="none"
      className="animate-[waveFlow_8s_linear_infinite]"
    />

    {/* wave 2 */}
    <path
      d="M0 250 Q200 150 400 250 T800 250 T1200 250"
      stroke="url(#heroGradient)"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
      className="animate-[waveFlowReverse_10s_linear_infinite]"
    />

    {/* moving particle */}
    <circle r="5" fill="url(#heroGradient)">
      <animateMotion
        dur="8s"
        repeatCount="indefinite"
        path="M0 200 Q150 100 300 200 T600 200 T900 200 T1200 200"
      />
    </circle>

    <defs>
      <linearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>

  {/* Badge */}
  <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-md">
    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
    <span className="text-xs tracking-widest text-secondary uppercase">
      Mathematical Animations Generator
    </span>
  </div>

  {/* HEADLINE */}
  <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] text-gray-900 dark:text-white mb-8 leading-[1.05]">
    Animate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]">Mathematics</span><br />
    Like Never Before
  </h1>

  {/* Floating equation */}
  <div className="absolute top-[20%] text-white/10 text-xl font-mono animate-pulse">
    y = sin(x + t)
  </div>

  {/* DESCRIPTION */}
  <p className="relative z-10 text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
    Turn equations into living systems. Visualize change, motion, and structure — powered by AI.
  </p>

  {/* CTA */}
<Link
  href="/login"
  className="relative z-10 group px-12 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg overflow-hidden animate-ctaGlowSoft hover:scale-[1.02] transition-all duration-300"
>
  <span className="relative z-10">Start Creating</span>

  {/* subtle sweep */}
  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-ctaSweepSoft" />
  </div>
</Link>

  {/* subtle grid */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
      backgroundSize: "80px 80px",
    }}
  />
</section>

        {/* Mathematical Animations Preview */}
        <MathematicalAnimationsPreview />

        {/* Feature Showcase */}
        <FeatureShowcase />

        {/* Statistics Section */}
        <StatisticsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Newsletter Section */}
        <NewsletterSection />

{/* CTA Section */}
<section className="w-full py-32 relative overflow-hidden bg-white dark:bg-black">

  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-3xl opacity-40" />

  {/* SVG WAVE */}
  <svg
    className="absolute inset-0 w-full h-full opacity-30"
    viewBox="0 0 1200 300"
    preserveAspectRatio="none"
  >
    {/* sine wave */}
    <path
      d="M0 150 Q150 50 300 150 T600 150 T900 150 T1200 150"
      fill="none"
      stroke="url(#waveGradient)"
      strokeWidth="3"
      className="animate-[waveMove_6s_linear_infinite]"
    />

    {/* glowing dot moving */}
    <circle r="6" fill="url(#waveGradient)">
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        path="M0 150 Q150 50 300 150 T600 150 T900 150 T1200 150"
      />
    </circle>

    {/* gradient */}
    <defs>
      <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>

  {/* CONTENT */}
  <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
    <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
      Bring <span className="text-gradient">Mathematics</span> to Life
    </h2>

    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto">
      Watch equations evolve, curves move, and ideas animate in real time.
    </p>

<Link
  href="/login"
  className="relative z-10 group px-12 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg overflow-hidden animate-ctaGlowSoft hover:scale-[1.02] transition-all duration-300"
>
  <span className="relative z-10">Start Creating</span>

  {/* subtle sweep */}
  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-ctaSweepSoft" />
  </div>
</Link>

  </div>

  {/* GRID overlay for depth */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />
</section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 dark:border-white/5 py-16 flex flex-col items-center bg-white dark:bg-black/50 dark:backdrop-blur-sm relative z-10 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="col-span-1">
              <Image
                src="/logo.png"
                alt="FlatMotion"
                width={240}
                height={60}
                className="h-16 w-auto mb-4"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Create beautiful mathematical animations with AI. No coding required.
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
              <div className="space-y-3">
                <a href="mailto:support@flatmotion.com" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  support@flatmotion.com
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  +1 (234) 567-890
                </a>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>San Francisco, California, USA</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
              <div className="space-y-2">
                <Link href="/features" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Features</Link>
                <Link href="/documentation" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Documentation</Link>
                <Link href="/blog" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Blog</Link>
                <Link href="/community" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Community</Link>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="https://twitter.com/flatmotion" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="https://github.com/flatmotion" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                  <Code className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com/company/flatmotion" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                </a>
                <a href="https://discord.gg/flatmotion" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-white/10 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-500">
              &copy; {new Date().getFullYear()} FlatMotion. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
