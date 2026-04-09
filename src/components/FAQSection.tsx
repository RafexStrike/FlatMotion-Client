"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Do I need coding experience to use FlatMotion?",
    answer: "No! FlatMotion is designed for non-technical users. Simply describe your animation in plain English, and our AI converts it to code for you."
  },
  {
    question: "What types of animations can I create?",
    answer: "You can create 2D mathematical animations including graphs, transformations, equations, geometric shapes, and data visualizations. Perfect for educational content."
  },
  {
    question: "How long does it take to generate an animation?",
    answer: "Most animations are generated within 30 seconds to 2 minutes, depending on complexity. Rendering time varies based on resolution and effects."
  },
  {
    question: "Can I download and use animations commercially?",
    answer: "Yes! All animations created with FlatMotion are yours to use, modify, and distribute commercially."
  },
  {
    question: "What file formats are supported for export?",
    answer: "Animations are exported as MP4 video files optimized for YouTube, presentations, and other platforms."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, you can create up to 3 animations with our free tier. Upgrade to unlock unlimited generations and advanced features."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-32">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 mb-6 border border-primary/30 rounded-full">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">
            FAQ
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Find answers to common questions about FlatMotion
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-surface hover:bg-gray-50 dark:hover:bg-surface-2 transition-colors text-left"
            >
              <span className="font-semibold text-gray-900 dark:text-white">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-surface-2 border-t border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
