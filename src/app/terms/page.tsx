"use client";

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By using FlatMotion, you agree to these terms and conditions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on FlatMotion for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Disclaimer</h2>
            <p>The materials on FlatMotion are provided on an 'as is' basis. FlatMotion makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Limitations</h2>
            <p>In no event shall FlatMotion or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FlatMotion.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Accuracy of Materials</h2>
            <p>The materials appearing on FlatMotion could include technical, typographical, or photographic errors. FlatMotion does not warrant that any of the materials on FlatMotion are accurate, complete, or current.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Links</h2>
            <p>FlatMotion has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by FlatMotion of the site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Modifications</h2>
            <p>FlatMotion may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of California and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
