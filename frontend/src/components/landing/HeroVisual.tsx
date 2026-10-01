import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Cpu, Network, FileCheck, Target, CheckCircle2, RefreshCw } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const steps = [
    { label: 'Reported Problem', icon: AlertCircle, color: 'text-amber-400', border: 'border-amber-500/30 bg-amber-500/10' },
    { label: 'AI Agent Reasoning', icon: Cpu, color: 'text-purple-400', border: 'border-purple-500/30 bg-purple-500/10' },
    { label: 'Problem Graph', icon: Network, color: 'text-cyan-400', border: 'border-cyan-500/30 bg-cyan-500/10' },
    { label: 'Evidence Correlated', icon: FileCheck, color: 'text-blue-400', border: 'border-blue-500/30 bg-blue-500/10' },
    { label: 'Probable Root Cause', icon: Target, color: 'text-rose-400', border: 'border-rose-500/30 bg-rose-500/10' },
    { label: 'Human-Approved Action', icon: CheckCircle2, color: 'text-emerald-400', border: 'border-emerald-500/30 bg-emerald-500/10' },
    { label: 'Telemetry Resolution', icon: RefreshCw, color: 'text-teal-400', border: 'border-teal-500/30 bg-teal-500/10' },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 rounded-2xl glass-panel-glow bg-cardBg/90 my-8 overflow-hidden">
      {/* Background animated grid glow */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-cardBorder pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-semibold text-slate-300">LIVE AGENT INVESTIGATION PIPELINE</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
            AUTONOMOUS AGENTIC LOOP
          </span>
        </div>

        {/* Animated Process Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl border ${step.border} backdrop-blur-md hover:scale-105 transition-transform`}
                >
                  <div className={`p-2 rounded-lg bg-slate-900/60 ${step.color} mb-1.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium leading-tight text-slate-200">
                    {step.label}
                  </span>
                </motion.div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:flex justify-center items-center">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                      className="text-cyan-400 font-mono text-xs"
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Connected Node Visual Preview */}
        <div className="mt-6 pt-4 border-t border-cardBorder/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Reported Symptom
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Discovered Root Cause
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Action & Monitoring
            </span>
          </div>
          <span className="text-cyan-400">6 Connected Scenarios Ready</span>
        </div>
      </div>
    </div>
  );
};
