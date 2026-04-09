"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, Globe, Heart, Mail } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & CEO",
      bio: "Mathematics educator turned entrepreneur",
      avatar: "AR"
    },
    {
      name: "Sam Chen",
      role: "Lead AI Engineer",
      bio: "Machine learning specialist with 10+ years experience",
      avatar: "SC"
    },
    {
      name: "Jordan Lee",
      role: "Product Designer",
      bio: "User experience design enthusiast",
      avatar: "JL"
    },
    {
      name: "Casey Williams",
      role: "Full Stack Developer",
      bio: "Web infrastructure and scalability expert",
      avatar: "CW"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            About <span className="text-gradient">FlatMotion</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Making mathematical animation accessible to everyone. No coding required.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-surface rounded-2xl p-8 border border-gray-200 dark:border-white/10">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Why We Started</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Creating mathematical animations is complex and time-consuming. We believe every educator, researcher, and creator should have access to professional animation tools without years of programming experience.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-surface rounded-2xl p-8 border border-gray-200 dark:border-white/10">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How We Help</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                FlatMotion uses AI to convert natural language descriptions into stunning 2D animations. Simply describe what you want to visualize, and our system handles the complex rendering automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-surface/30 border-y border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Accessibility", description: "Technology should work for everyone, regardless of technical background" },
              { title: "Quality", description: "We prioritize excellence in every animation and user interaction" },
              { title: "Innovation", description: "We constantly push the boundaries of what's possible with AI" }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white dark:bg-surface rounded-2xl p-6 border border-gray-200 dark:border-white/10 text-center hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "4,500+", label: "Animations Created" },
              { number: "1,200+", label: "Active Users" },
              { number: "2024", label: "Year Founded" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to create?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of educators and creators making beautiful animations
          </p>
          <Link
            href="/register"
            className="inline-flex px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
