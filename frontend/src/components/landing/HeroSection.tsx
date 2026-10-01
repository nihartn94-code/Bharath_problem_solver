import React from 'react';
import { Play, Search, Shield, Zap } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroSectionProps {
  onStart: () => void;
  onDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart, onDemo }) => {
  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto overflow-hidden">
      {/* Product Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-300 mb-6 shadow-sm">
        <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>AGENTIC AI • PROBLEM INVESTIGATION • REAL-WORLD IMPACT</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
        BHARAT PROBLEM SOLVER
      </h1>

      {/* Tagline */}
      <p className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 mb-6">
        “Every problem has a story.”
      </p>

      {/* Subtitle */}
      <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
        Bharat Problem Solver uses an AI agent to investigate how real-world problems are connected, identify probable root causes, understand their impact, and coordinate actionable solutions.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>Start Investigation</span>
        </button>

        <button
          onClick={onDemo}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cardBg border border-cardBorder hover:border-cyan-500/50 text-slate-200 hover:text-white font-semibold text-base hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" />
          <span>Try Live Demo</span>
        </button>
      </div>

      {/* Hero Visual Component */}
      <HeroVisual />
    </section>
  );
};
