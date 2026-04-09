"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Contact Info</h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                </div>
                <a href="mailto:support@flatmotion.com" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  support@flatmotion.com
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                </div>
                <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  San Francisco, California<br />
                  United States
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-900/30">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <span className="font-semibold">Response time:</span> We typically reply within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="p-12 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-200 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-800 dark:text-green-300 mb-6">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 10px center",
                      paddingRight: "32px",
                    }}
                  >
                    <option value="">Select a subject...</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50 resize-none"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
