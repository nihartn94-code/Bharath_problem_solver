import React from 'react';
import { Network, ArrowRight } from 'lucide-react';

interface FooterProps {
  onStart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStart }) => {
  return (
    <footer className="border-t border-cardBorder bg-cardBg/60 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>BHARAT PROBLEM SOLVER</span>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            “From symptom to system.” A single complaint can hide a network of connected problems. Bharat Problem Solver uses agentic AI to uncover those connections, investigate evidence, and coordinate resolution.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
          >
            <span>START AN INVESTIGATION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Problem Domains</h4>
          <ul className="space-y-2 text-xs">
            <li>🚌 Bus & Transit Delays</li>
            <li>🗑️ Waste & Garbage Collection</li>
            <li>🚦 Traffic & Signal Faults</li>
            <li>💧 Water Pipeline Leakage</li>
            <li>🏢 Apartment Facility Issues</li>
            <li>🏥 Hospital OPD Wait Times</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Agent Architecture</h4>
          <ul className="space-y-2 text-xs">
            <li>Stage 01 — Understand</li>
            <li>Stage 02 — Investigate</li>
            <li>Stage 03 — Connect Problem Graph</li>
            <li>Stage 04 — Verify Evidence</li>
            <li>Stage 05 — Human Action Approval</li>
            <li>Stage 06 — Telemetry Monitoring</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-cardBorder/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2026 Bharat Problem Solver • Built for Hackathon Excellence.</p>
        <p className="font-mono">Agentic AI Platform v1.0.0</p>
      </div>
    </footer>
  );
};
