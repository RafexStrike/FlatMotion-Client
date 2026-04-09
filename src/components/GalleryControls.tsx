"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";
import { AnimationJob } from "@/hooks/useAnimationJobs";

interface GalleryControlsProps {
  animations: AnimationJob[];
  loading: boolean;
  onFilterChange: (filtered: AnimationJob[]) => void;
  children: React.ReactNode;
}

type SortOption = "recent" | "oldest" | "name" | "popular";

export function GalleryControls({
  animations,
  loading,
  onFilterChange,
  children,
}: GalleryControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort animations
  const filteredAnimations = useMemo(() => {
    let result = [...animations];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (animation) =>
          animation.projectName?.toLowerCase().includes(query) ||
          animation.prompt?.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "name":
        result.sort((a, b) =>
          (a.projectName || "").localeCompare(b.projectName || "")
        );
        break;
      case "popular":
        // Sort by completion time (completed animations first)
        result.sort((a, b) => {
          const aStatus = a.status === "done" ? 0 : 1;
          const bStatus = b.status === "done" ? 0 : 1;
          return aStatus - bStatus;
        });
        break;
    }

    return result;
  }, [animations, searchQuery, sortBy]);

  // Update parent with filtered results
  useMemo(() => {
    onFilterChange(filteredAnimations);
  }, [filteredAnimations, onFilterChange]);

  return (
    <div className="space-y-6">
      {/* Search and Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search animations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          disabled={loading}
          className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary transition-colors appearance-none cursor-pointer disabled:opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${
              document.documentElement.classList.contains("dark")
                ? "9ca3af"
                : "6b7280"
            }' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            paddingRight: "32px",
          }}
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
          <option value="popular">Completed First</option>
        </select>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-surface-2 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredAnimations.length} of {animations.length} animations
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
        {(searchQuery || sortBy !== "recent") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSortBy("recent");
            }}
            className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Render children with filtered animations */}
      {children}
    </div>
  );
}
