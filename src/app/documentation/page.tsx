"use client";

import Link from "next/link";
import { BookOpen, Code, Zap, FileText, Video, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("getting-started");

  const docSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to FlatMotion</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">FlatMotion is an AI-powered platform that lets you create stunning 2D animations from simple text descriptions.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quick Start in 3 Steps</h4>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">1</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Sign Up & Get API Key</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create your account and get your unique API key from the dashboard.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold flex-shrink-0">2</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Add API Key to Dashboard</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Navigate to dashboard settings and enter your API key.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold flex-shrink-0">3</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Describe Your Animation</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Write a prompt describing what you want to animate and hit generate!</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: "prompting",
      title: "Prompt Writing Guide",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Write Effective Prompts</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">The quality of your animation depends on how clearly you describe it. Here are some tips:</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Template Structure</h4>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-900 dark:text-gray-100 mb-4">
              "Animate [WHAT] with [STYLE] over [DURATION] seconds, showing [DETAILS] with [VISUAL ELEMENTS]"
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Example Prompts</h4>
            <ul className="space-y-3">
              <li className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Sine Wave</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">"Animate a sine wave from 0 to 2π over 3 seconds, smoothly oscillating with coordinate axes labeled. Use a purple gradient for the curve."</p>
              </li>
              <li className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Geometric Pattern</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">"Create a Fibonacci spiral that grows from the center outward over 5 seconds. Add golden ratio rectangles appearing sequentially. Use cyan and purple colors."</p>
              </li>
              <li className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Data Visualization</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">"Animate a bar chart showing growth from Jan to Dec. Bars rise sequentially over 4 seconds with values labeled. Use gradient colors from blue to purple."</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Pro Tips</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>✓ Be specific about timing and duration</li>
              <li>✓ Include visual style preferences (colors, themes)</li>
              <li>✓ Specify mathematical or positional details</li>
              <li>✓ Use "smoothly" or "gradually" for easing</li>
              <li>✗ Avoid vague descriptions like "make it cool"</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "api",
      title: "API Reference",
      icon: Code,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">API Endpoints</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">All requests require your API key in the Authorization header.</p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Generate Animation</h4>
              <div className="bg-gray-900 dark:bg-gray-800 p-4 rounded font-mono text-sm text-gray-100 overflow-x-auto">
                POST /api/animations/generate<br />
                Content-Type: application/json<br />
                <br />
                &#123;<br />
                &nbsp;&nbsp;"prompt": "Animate a sine wave...",<br />
                &nbsp;&nbsp;"duration": 3,<br />
                &nbsp;&nbsp;"style": "smooth",<br />
                &nbsp;&nbsp;"format": "mp4"<br />
                &#125;
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Response Example</h4>
              <div className="bg-gray-900 dark:bg-gray-800 p-4 rounded font-mono text-sm text-gray-100 overflow-x-auto">
                &#123;<br />
                &nbsp;&nbsp;"id": "anim_123abc",<br />
                &nbsp;&nbsp;"status": "processing",<br />
                &nbsp;&nbsp;"downloadUrl": "https://...",<br />
                &nbsp;&nbsp;"createdAt": "2024-01-15T10:30:00Z"<br />
                &#125;
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Supported Formats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">mp4</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">H.264 encoded video</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">webm</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">VP9 web format</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">gif</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Animated GIF</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">svg</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vector format</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "examples",
      title: "Examples & Tutorials",
      icon: Video,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Animation Examples</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Here are some popular animations created with FlatMotion:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Trigonometric Functions", category: "Mathematical" },
              { title: "Parametric Curves", category: "Mathematical" },
              { title: "Cellular Automata", category: "Generative" },
              { title: "3D Rotation Projection", category: "Advanced" },
              { title: "Financial Charts", category: "Data Viz" },
              { title: "Molecular Structures", category: "Scientific" },
            ].map((example, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-primary transition-colors">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{example.category}</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{example.title}</h4>
                <button className="mt-4 text-sm text-primary hover:underline">View Example →</button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      title: "FAQ",
      icon: HelpCircle,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {[
              { q: "What's included in the free plan?", a: "The free plan includes up to 10 animations/month, standard export formats, and access to the template library." },
              { q: "How long does animation generation take?", a: "Most animations generate in 30-120 seconds depending on complexity. You can download them as soon as processing completes." },
              { q: "Can I use animations commercially?", a: "Yes! Animations created with FlatMotion can be used for commercial purposes. Check our terms for details." },
              { q: "Do you offer API access?", a: "Yes, we have a REST API with comprehensive documentation. Contact our sales team for API access details." },
              { q: "What's the maximum animation duration?", a: "Animations can be up to 60 seconds long. For longer content, split your animation into multiple parts." },
              { q: "Can I edit animations after generation?", a: "You can regenerate with modified prompts. We also support exporting to SVG and JSON for further customization." },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Everything you need to create amazing animations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200 dark:border-gray-800">
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === section.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-8">
          {docSections.find((s) => s.id === activeTab)?.content}
        </div>

        {/* Support CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Need more help?</p>
          <Link href="/contact" className="text-primary hover:underline font-semibold">
            Contact our support team →
          </Link>
        </div>
      </div>
    </div>
  );
}
