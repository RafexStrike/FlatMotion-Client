"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with FlatMotion: Your First Animation",
    excerpt: "Learn how to create your first mathematical animation in just 5 minutes. A beginner's guide to making stunning visualizations.",
    content: "Full article content here...",
    date: "Dec 15, 2024",
    category: "Tutorial",
    author: "Sarah Chen",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Advanced Prompt Engineering for Better Animations",
    excerpt: "Master the art of writing detailed descriptions to get exactly the animations you want. Tips from experienced creators.",
    content: "Full article content here...",
    date: "Dec 10, 2024",
    category: "Tips & Tricks",
    author: "James Mitchell",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "Using Mathematics Animations in Education",
    excerpt: "How educators worldwide are using FlatMotion to make complex mathematics concepts accessible and engaging for students.",
    content: "Full article content here...",
    date: "Dec 5, 2024",
    category: "Case Study",
    author: "David Kumar",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Introducing Real-Time Animation Preview",
    excerpt: "We're excited to launch real-time preview for your animations. See your ideas come to life instantly.",
    content: "Full article content here...",
    date: "Nov 28, 2024",
    category: "Product Update",
    author: "Emily Rodriguez",
    readTime: "4 min read"
  },
  {
    id: "5",
    title: "Behind the Scenes: How FlatMotion Generates Animations",
    excerpt: "An in-depth look at our AI-powered animation generation pipeline and the technology that makes it all possible.",
    content: "Full article content here...",
    date: "Nov 20, 2024",
    category: "Technology",
    author: "Alex Rivera",
    readTime: "10 min read"
  },
  {
    id: "6",
    title: "Community Spotlight: Amazing Animations from Users",
    excerpt: "Celebrate the incredible work our community is creating. From educational videos to research visualizations.",
    content: "Full article content here...",
    date: "Nov 15, 2024",
    category: "Community",
    author: "Sam Chen",
    readTime: "7 min read"
  }
];

const categories = ["All", "Tutorial", "Tips & Tricks", "Case Study", "Product Update", "Technology", "Community"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            FlatMotion <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Tutorials, tips, and stories from the animation community
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-surface text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-surface-2"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all hover:shadow-lg dark:hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/20 flex flex-col bg-white dark:bg-surface"
                >
                  {/* Category Badge */}
                  <div className="h-24 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-gray-200 dark:border-white/10 flex items-end p-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-white/10 pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/blog/${post.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-gray-200 dark:border-white/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Never miss an update</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Subscribe to our newsletter and get the latest tutorials and tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
