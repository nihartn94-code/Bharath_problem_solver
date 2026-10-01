import React from 'react';
import { Search, Network } from 'lucide-react';

interface CallToActionProps {
  onStart: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onStart }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="p-10 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl shadow-cyan-500/10">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Network className="w-64 h-64 text-cyan-400" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded bg-cyan-900/60 border border-cyan-700">
            START YOUR INVESTIGATION NOW
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4">
            From symptom to system.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            A single complaint can hide a network of connected problems. Bharat Problem Solver uses agentic AI to uncover those connections, investigate evidence, and help move problems toward resolution.
          </p>

          <button
            onClick={onStart}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-cyan-500/30 hover:scale-105 hover:shadow-cyan-500/50 transition-all inline-flex items-center gap-3"
          >
            <Search className="w-5 h-5" />
            <span>START AN INVESTIGATION</span>
          </button>
        </div>
      </div>
    </section>
  );
};
