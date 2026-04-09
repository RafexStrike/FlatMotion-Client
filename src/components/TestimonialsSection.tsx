"use client";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Mathematics Educator",
    content: "FlatMotion made creating animations for my lectures effortless. My students are more engaged than ever!",
    avatar: "SC"
  },
  {
    name: "James Mitchell",
    role: "Research Scientist",
    content: "The AI-powered generation is incredibly intuitive. I can visualize complex algorithms in minutes.",
    avatar: "JM"
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    content: "No coding experience needed! FlatMotion let me produce professional animations for my YouTube channel.",
    avatar: "ER"
  },
  {
    name: "Prof. David Kumar",
    role: "Physics Department Head",
    content: "Outstanding tool for explaining abstract concepts. Our lecture videos have never looked better.",
    avatar: "DK"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-32">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1 mb-6 border border-primary/30 rounded-full">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">
            Success Stories
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Loved by <span className="text-gradient">Educators & Creators</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Join educators, researchers, and content creators who are transforming how they visualize mathematics.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white dark:bg-surface border border-gray-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">⭐</span>
              ))}
            </div>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
