"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitted(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-32">
      <div className="w-full max-w-2xl mx-auto px-6">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-3xl -z-10" />

        {/* Content */}
        <div className="relative">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 mb-4 border border-primary/30 rounded-full">
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-mono">
                Stay Updated
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Get <span className="text-gradient">Tips & Updates</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to receive tutorials, animation tips, and updates about new features.
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="p-8 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-2">
                Successfully subscribed!
              </h3>
              <p className="text-sm text-green-800 dark:text-green-300">
                Check your email for confirmation and first exclusive tips.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !email}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-3 text-center">
              {error}
            </p>
          )}

          {/* Terms */}
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
