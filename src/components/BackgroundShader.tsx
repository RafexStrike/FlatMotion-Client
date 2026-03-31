"use client";

export default function BackgroundShader() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">

      {/* MAIN GLOW CORE (stronger) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.35),transparent_60%)] blur-2xl" />

      {/* SECONDARY CYAN */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(6,182,212,0.25),transparent_60%)] blur-2xl" />

      {/* MOVING ENERGY BLOBS (this is what makes it alive) */}
      <div className="absolute w-[60%] h-[60%] bg-purple-500/20 blur-3xl rounded-full animate-slow-drift top-[10%] left-[20%]" />
      <div className="absolute w-[60%] h-[60%] bg-cyan-400/20 blur-3xl rounded-full animate-slow-drift-reverse bottom-[10%] right-[20%]" />

      {/* LIGHT BEAMS (make them visible) */}
      <div className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent top-[30%] animate-[beamMove_6s_linear_infinite]" />
      <div className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent top-[65%] animate-[beamMoveReverse_8s_linear_infinite]" />

      {/* GRID (slightly stronger) */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

    </div>
  );
}