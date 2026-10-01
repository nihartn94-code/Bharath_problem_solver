import React from 'react';
import { Cpu, Wrench, Network, RefreshCcw, Check, X } from 'lucide-react';

export const NotAChatbotSection: React.FC = () => {
  const features = [
    {
      title: 'REASON',
      desc: 'Understands the reported problem, extracts entities, and determines what external information is required.',
      icon: Cpu,
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    },
    {
      title: 'INVESTIGATE',
      desc: 'Calls telemetry tools, contextual APIs, municipal records, and historical complaint databases.',
      icon: Wrench,
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
    },
    {
      title: 'CONNECT',
      desc: 'Builds a dynamic React Flow Problem Graph showing deep relationships between causes, events, and impacts.',
      icon: Network,
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    },
    {
      title: 'MONITOR',
      desc: 'Tracks recovery metrics post-action and automatically re-investigates when civic state shifts.',
      icon: RefreshCcw,
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-950/60 border border-emerald-800">
          WHY IT IS DIFFERENT
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
          Not Just a Chatbot
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          Unlike static complaint forms or conversational chatbots, Bharat Problem Solver is an agentic platform that maintains state, calls tools, constructs knowledge graphs, and monitors outcomes.
        </p>
      </div>

      {/* 4 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder">
              <div className={`p-3 rounded-xl border ${feat.color} inline-block mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Visual Comparison Box */}
      <div className="p-8 rounded-2xl glass-panel-glow bg-cardBg/95 border border-cardBorder">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Architectural Comparison</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Traditional System */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-rose-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-rose-400 flex items-center gap-2">
                  <X className="w-4 h-4" /> Traditional System
                </span>
                <span className="text-[10px] font-mono text-slate-500">STATIC FORM</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-slate-400">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">1. Citizen submits text complaint</div>
                <div className="text-center text-rose-500">↓</div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">2. Static auto-reply / Ticket assigned</div>
                <div className="text-center text-rose-500">↓</div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">3. No root cause discovery or cross-domain correlation</div>
              </div>
            </div>
            <p className="text-xs text-rose-300/80 mt-6 pt-4 border-t border-rose-500/10 italic">
              Result: Symptoms patched individually; underlying systemic failures ignored.
            </p>
          </div>

          {/* Bharat Problem Solver */}
          <div className="p-6 rounded-xl bg-slate-900/80 border border-cyan-500/40 shadow-lg shadow-cyan-500/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Bharat Problem Solver
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">AGENTIC LOOP</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs font-semibold">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300">Report</span>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300">Reason</span>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">Investigate</span>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300">Connect</span>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded bg-teal-500/20 border border-teal-500/40 text-teal-300">Verify</span>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300">Act</span>
                <span className="text-cyan-400">→</span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">Monitor</span>
              </div>
            </div>
            <p className="text-xs text-cyan-300/80 mt-6 pt-4 border-t border-cyan-500/20 font-medium">
              Result: Discovers root causes, coordinates human-approved actions, and tracks resolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
