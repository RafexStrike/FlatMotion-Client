"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, User, Lock, Bell, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Auth guard
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage(null), 5000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords don't match" });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters" });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage({ type: "success", text: "Password changed successfully!" });
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      setTimeout(() => setMessage(null), 5000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to change password" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        {/* Alert Messages */}
        {message && (
          <div className={`mb-8 p-4 rounded-lg border flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30 text-green-600 dark:text-green-400"
              : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400"
          }`}>
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p>{message.text}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-white/10 p-6 sticky top-24">
              {/* Profile Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-1">
                {user.name || "User"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
                {user.role}
              </p>

              <div className="space-y-3">
                <button className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-surface-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-surface-2 transition-colors text-sm font-medium">
                  Download Data
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors text-sm font-medium border border-red-200 dark:border-red-900/30"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-white/10 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Information
              </h3>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={saving}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-surface-2 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Email cannot be changed</p>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-white/10 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Change Password
              </h3>

              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      disabled={saving}
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    disabled={saving}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Min. 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={saving}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-surface text-gray-900 dark:text-white focus:outline-none focus:border-primary dark:focus:border-primary transition-colors disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-white/10 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </h3>

              <div className="space-y-4">
                {["Email notifications", "Weekly digest", "Animation tips", "New features"].map((pref, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={i < 2}
                      className="w-4 h-4 rounded border-gray-300 dark:border-white/10 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-900 dark:text-white">{pref}</span>
                  </label>
                ))}
              </div>

              <button className="mt-6 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition-all">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
