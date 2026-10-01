import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, GitGraph, ShieldCheck, UserCheck, Activity } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const stages = [
    {
      num: '01',
      title: 'Understand',
      desc: "The agent interprets unstructured user text, voice, or image complaints and auto-classifies the civic domain.",
      icon: Brain,
      color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400'
    },
    {
      num: '02',
      title: 'Investigate',
      desc: "Selects and queries targeted telemetry tools (e.g. traffic sensors, bus GPS, water pipe pressure logs).",
      icon: Search,
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400'
    },
    {
      num: '03',
      title: 'Connect',
      desc: "Constructs a dynamic React Flow Problem Graph linking causes, events, entities, and affected citizens.",
      icon: GitGraph,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400'
    },
    {
      num: '04',
      title: 'Verify',
      desc: "Evaluates multi-source telemetry evidence with explicit confidence ratings (Confirmed, High, Probable).",
      icon: ShieldCheck,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400'
    },
    {
      num: '05',
      title: 'Act',
      desc: "Formulates an actionable plan requiring explicit Human-in-the-Loop operator approval before dispatching.",
      icon: UserCheck,
      color: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400'
    },
    {
      num: '06',
      title: 'Monitor',
      desc: "Tracks recovery metrics post-action (e.g. bus delay 40m -> 10m) and updates the Problem Graph live.",
      icon: Activity,
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-widest px-3 py-1 rounded bg-purple-950/60 border border-purple-800">
          AUTONOMOUS REASONING ARCHITECTURE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
          How the Agent Investigates
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          From raw report to verified resolution—the AI agent follows a strict, transparent 6-stage lifecycle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl bg-gradient-to-b ${stage.color} border backdrop-blur-md hover:scale-[1.02] transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black opacity-60 text-white">
                    {stage.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cardBorder">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{stage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>STAGE {stage.num} OF 06</span>
                <span className="text-cyan-400">AUTONOMOUS</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
