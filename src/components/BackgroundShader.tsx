"use client";

import React from "react";

/**
 * Refined BackgroundShader with a prominent centered glow to match the reference image.
 * Uses multiple layers of radial gradients and slow animations for a dynamic, premium feel.
 */
export default function BackgroundShader() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000000]">
      {/* Centered Primary Glow - Purple */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[100%] h-[100%] rounded-full opacity-[0.15] blur-[160px] animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 60%)',
        }}
      />
      
      {/* Centered Secondary Glow - Cyan */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[100%] h-[100%] rounded-full opacity-[0.1] blur-[160px] animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 60%)',
          animationDelay: '-2s'
        }}
      />

      {/* Floating Orbs for dynamic feel */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.05] blur-[120px] animate-slow-drift"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.05] blur-[120px] animate-slow-drift-reverse"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', animationDelay: '-5s' }}
      />

      {/* Noise / Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Subtle Grid / Mesh */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} 
      />
    </div>
  );
}
