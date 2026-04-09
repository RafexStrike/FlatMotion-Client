"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for charts
const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 200 },
  { month: "Mar", users: 350 },
  { month: "Apr", users: 480 },
  { month: "May", users: 650 },
  { month: "Jun", users: 1200 }
];

const animationStatsData = [
  { name: "Completed", value: 3800 },
  { name: "Processing", value: 350 },
  { name: "Failed", value: 350 }
];

const animationsByTypeData = [
  { type: "Educational", count: 1200 },
  { type: "Mathematical", count: 850 },
  { type: "Scientific", count: 650 },
  { type: "Other", count: 400 }
];

const COLORS = ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B"];

export function AdminCharts() {
  return (
    <div className="space-y-8">
      {/* User Growth Chart */}
      <div className="bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">User Growth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(124,58,237,0.5)" }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ fill: "#7C3AED", r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Animation Status Pie Chart */}
        <div className="bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Animation Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={animationStatsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {animationStatsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(124,58,237,0.5)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Animations by Type Bar Chart */}
        <div className="bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Animations by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={animationsByTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="type" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(124,58,237,0.5)" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="count" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Avg. Generation Time</h4>
          <p className="text-3xl font-bold text-primary">45 sec</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">↓ 12% from last week</p>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Success Rate</h4>
          <p className="text-3xl font-bold text-primary">91.6%</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">↑ 5% from last week</p>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">API Response Time</h4>
          <p className="text-3xl font-bold text-primary">126 ms</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">↓ 8% from last week</p>
        </div>
      </div>
    </div>
  );
}
