"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 pl-2 border-l border-gray-300 dark:border-white/10 ml-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-[10px] sm:text-xs font-bold text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all cursor-pointer overflow-hidden relative group"
        title={user.name || "User Profile"}
      >
        <span className="relative z-10">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-lg shadow-xl dark:shadow-2xl overflow-hidden z-50 transform transition-all duration-200 origin-top-right">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-surface-2">
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
              {user.name || "User"}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {user.email || "No email"}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Profile */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-2 transition-colors"
            >
              <User className="w-4 h-4 text-primary" />
              <span>My Profile</span>
            </Link>

            {/* Settings */}
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-2 transition-colors"
            >
              <Settings className="w-4 h-4 text-primary" />
              <span>Settings</span>
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-gray-200 dark:border-white/10" />

            {/* Logout */}
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
