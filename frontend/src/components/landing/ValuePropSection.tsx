import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, AlertTriangle, TrafficCone, Bus, Users, ArrowRight } from 'lucide-react';

export const ValuePropSection: React.FC = () => {
  const chainItems = [
    { label: 'Water Leak', desc: 'Main Feeder Line Burst', icon: Droplet, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { label: 'Road Flooding', desc: '300m Surface Waterlogging', icon: AlertTriangle, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { label: 'Traffic Congestion', desc: '1.4km Gridlock Tailback', icon: TrafficCone, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { label: 'Bus Transit Delay', desc: 'Route 500-D Delayed 40m', icon: Bus, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    { label: 'Passengers Affected', desc: '120 Stranded Commuters', icon: Users, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded bg-cyan-950/60 border border-cyan-800">
          SYSTEM-LEVEL DISCOVERY
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
          From a Report to a Complete Problem Picture
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          Citizens report visible symptoms. The AI Agent discovers the systemic chain behind them—connecting infrastructure, traffic, transit, and public impact into a unified Problem Graph.
        </p>
      </div>

      {/* Main Visual Breakdown Container */}
      <div className="p-8 rounded-2xl glass-panel-glow bg-cardBg/90 border border-cardBorder relative overflow-hidden">
        {/* Top Callout Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-cardBorder mb-8">
          <div>
            <span className="text-xs font-mono text-slate-400">INPUT USER REPORT:</span>
            <p className="text-base font-semibold text-amber-300 italic mt-0.5">
              “There is water flooding the road near my apartment.”
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold text-center">
            1 reported problem → 4 connected issues discovered
          </div>
        </div>

        {/* Chain Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-stretch relative">
          {chainItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15, duration: 0.4 }}
                  viewport={{ once: true }}
                  className={`p-4 rounded-xl border ${item.color} backdrop-blur-md flex flex-col justify-between hover:shadow-lg transition-all`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400">NODE 0{idx + 1}</span>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.label}</h4>
                    <p className="text-xs text-slate-300">{item.desc}</p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-700/40 text-[10px] font-mono text-slate-400">
                    {idx === 0 ? 'ROOT CAUSE' : idx === chainItems.length - 1 ? 'DOWNSTREAM IMPACT' : 'CONNECTED EVENT'}
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
