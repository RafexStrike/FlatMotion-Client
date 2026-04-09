"use client";

import Link from "next/link";
import { Heart, Share2, MessageCircle, Award, Users, Zap } from "lucide-react";
import { useState } from "react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("community");

  const communityStats = [
    { label: "Active Creators", value: "12,000+", icon: Users },
    { label: "Animations Shared", value: "50,000+", icon: Heart },
    { label: "Countries", value: "150+", icon: Zap },
  ];

  const featuredCreators = [
    {
      name: "Dr. Sarah Chen",
      role: "Physics Educator",
      animations: 234,
      followers: "8.2K",
      bio: "Creating interactive physics visualizations for students worldwide",
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist",
      animations: 156,
      followers: "5.6K",
      bio: "Specializing in financial data visualizations and market analysis",
    },
    {
      name: "Elena Rodriguez",
      role: "Creative Technologist",
      animations: 312,
      followers: "12.1K",
      bio: "Blending art and mathematics to create stunning visualizations",
    },
    {
      name: "Prof. James Liu",
      role: "Mathematics Professor",
      animations: 189,
      followers: "7.3K",
      bio: "Teaching advanced mathematics through engaging animations",
    },
  ];

  const communityTopics = [
    {
      title: "Getting Started with Sine Waves",
      category: "Tutorial",
      replies: 24,
      views: 1240,
      latest: "2 hours ago",
    },
    {
      title: "Best Practices for Educational Animations",
      category: "Discussion",
      replies: 156,
      views: 5890,
      latest: "30 mins ago",
    },
    {
      title: "Showcase: My Fibonacci Spiral Animation",
      category: "Showcase",
      replies: 89,
      views: 3450,
      latest: "1 hour ago",
    },
    {
      title: "Tips for Creating Smooth Transitions",
      category: "Tips & Tricks",
      replies: 42,
      views: 2130,
      latest: "4 hours ago",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Join the FlatMotion <span className="text-gradient">Community</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Connect with thousands of creators, share your animations, get inspiration, and collaborate on amazing projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-105 transition-transform"
            >
              Join Now
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              Browse as Guest
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Featured Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCreators.map((creator, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-primary/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{creator.name}</h3>
                    <p className="text-sm text-primary font-semibold mb-2">{creator.role}</p>
                  </div>
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{creator.bio}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">{creator.animations}</span>
                    <p className="text-gray-600 dark:text-gray-400">Animations</p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">{creator.followers}</span>
                    <p className="text-gray-600 dark:text-gray-400">Followers</p>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Forum */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Community Forum</h2>

          <div className="space-y-4">
            {communityTopics.map((topic, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-white bg-primary px-2 py-1 rounded">
                        {topic.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Updated {topic.latest}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <MessageCircle className="w-4 h-4 inline mr-1" />
                        {topic.replies}
                      </div>
                      <div>
                        <Eye className="w-4 h-4 inline mr-1" />
                        {topic.views}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
            >
              Visit Full Forum →
            </Link>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">What You Can Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Share Your Animations</h3>
                <p className="text-gray-600 dark:text-gray-400">Showcase your creations to the community. Get feedback, likes, and maybe even get featured on our homepage!</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connect with Others</h3>
                <p className="text-gray-600 dark:text-gray-400">Follow creators you admire, build your network, and collaborate on exciting projects together.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MessageCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join Discussions</h3>
                <p className="text-gray-600 dark:text-gray-400">Participate in forums, ask questions, share tips, and learn from experienced animators in the community.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Award className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Earn Recognition</h3>
                <p className="text-gray-600 dark:text-gray-400">Build your portfolio, gain followers, and potentially earn income through community rewards and features.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Community Guidelines</h2>

          <div className="space-y-6 bg-gray-50 dark:bg-gray-950 rounded-lg p-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Be Respectful</h3>
              <p className="text-gray-600 dark:text-gray-400">Treat all community members with kindness and respect, regardless of skill level or experience.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Share Knowledge</h3>
              <p className="text-gray-600 dark:text-gray-400">Help others by sharing tips, tricks, and best practices. We grow stronger when we help each other.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Spam or Self-Promotion</h3>
              <p className="text-gray-600 dark:text-gray-400">Keep discussions focused and relevant. Excessive self-promotion or spam will be moderated.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Respect Intellectual Property</h3>
              <p className="text-gray-600 dark:text-gray-400">Always credit original creators and respect copyright. Share your work, but give credit where it's due.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Join?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Become part of a thriving community of creators and animators.</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:scale-105 transition-transform"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
}

// Eye icon import fallback
const Eye = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
