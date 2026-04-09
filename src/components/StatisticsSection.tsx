"use client";

interface Stat {
  label: string;
  value: string;
  description: string;
}

const stats: Stat[] = [
  {
    label: "Animations Created",
    value: "4,500+",
    description: "Mathematical animations generated worldwide"
  },
  {
    label: "Active Users",
    value: "1,200+",
    description: "Educators and creators using FlatMotion"
  },
  {
    label: "Countries",
    value: "45+",
    description: "Users across the globe"
  },
  {
    label: "Average Time Saved",
    value: "10 hrs",
    description: "Per animation compared to manual coding"
  }
];

export default function StatisticsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 blur-3xl -z-10" />

      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          By The Numbers
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          FlatMotion is enabling beautiful mathematical visualizations worldwide
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white dark:bg-surface border border-gray-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 text-center group"
          >
            <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
              {stat.value}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {stat.label}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
