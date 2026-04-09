"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly (name, email) and information about your usage of our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to provide, maintain, and improve our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
            <p>For privacy concerns, please contact us at support@flatmotion.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
