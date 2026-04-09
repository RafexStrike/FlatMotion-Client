"use client";

import Link from "next/link";
import { Sparkles, Code, Zap, Users, Shield, BarChart3, Palette, BookOpen } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Animation Generation",
      description: "Describe your animation in natural language and let AI generate stunning 2D animations. No coding experience required.",
    },
    {
      icon: Code,
      title: "Mathematical Visualizations",
      description: "Animate mathematical concepts, functions, and equations. Perfect for education, research, and technical demonstrations.",
    },
    {
      icon: Zap,
      title: "Real-Time Preview",
      description: "See your animations instantly with live preview. Iterate quickly and refine your visualizations in real-time.",
    },
    {
      icon: Users,
      title: "Collaboration & Sharing",
      description: "Share your animations with team members, colleagues, and the community. Get feedback and improve together.",
    },
    {
      icon: Palette,
      title: "Customizable Styling",
      description: "Full control over colors, gradients, themes, and visual effects. Create animations that match your brand or style.",
    },
    {
      icon: BarChart3,
      title: "Data Visualization",
      description: "Transform raw data into compelling animated visualizations. Perfect for presentations and reports.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your animations. Your content is encrypted and protected.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Library",
      description: "Access thousands of pre-built animation templates and examples to inspire your creations.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for <span className="text-gradient">Creative Animations</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            FlatMotion combines AI technology with intuitive design to make animation creation accessible to everyone, from students to professionals.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-primary/20 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Why Choose FlatMotion?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">0</div>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mb-2">Coding Required</p>
              <p className="text-gray-600 dark:text-gray-400">Create animations using natural language. No programming skills needed.</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">∞</div>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mb-2">Possibilities</p>
              <p className="text-gray-600 dark:text-gray-400">From simple functions to complex visualizations, your imagination is the only limit.</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">⚡</div>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mb-2">Lightning Fast</p>
              <p className="text-gray-600 dark:text-gray-400">Generate and iterate on animations in seconds with our AI engine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Export & Integration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Export & Integration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Multiple Export Formats</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  MP4 & WebM video formats for web and social media
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  SVG & PNG sequences for frame-by-frame control
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  GIF format for instant sharing and previews
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  JSON data for custom integration and post-processing
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Perfect For</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Educational presentations and online courses
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Scientific papers and research visualization
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Marketing & promotional content
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Technical documentation and tutorials
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Create Amazing Animations?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Start with our free plan today and unlock the power of AI-generated animations.</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:scale-105 transition-transform"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
