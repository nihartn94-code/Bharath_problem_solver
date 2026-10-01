import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Cpu } from 'lucide-react';
import { AgentEvent } from '../../types';

interface AgentTimelineProps {
  events: AgentEvent[];
  isComplete?: boolean;
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({ events, isComplete = true }) => {
  const steps = [
    { key: 'understand', label: 'Understanding problem' },
    { key: 'entities', label: 'Identifying entities' },
    { key: 'graph', label: 'Building Problem Graph' },
    { key: 'infra', label: 'Checking related infrastructure' },
    { key: 'incidents', label: 'Checking nearby incidents' },
    { key: 'evidence', label: 'Gathering evidence' },
    { key: 'correlate', label: 'Correlating evidence' },
    { key: 'connected', label: 'Finding connected problems' },
    { key: 'root_cause', label: 'Identifying probable cause' },
    { key: 'impact', label: 'Analyzing impact' },
    { key: 'action', label: 'Preparing action plan' },
  ];

  return (
    <div className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder">
      <div className="flex items-center justify-between mb-4 border-b border-cardBorder pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h3 className="text-base font-bold text-white">Live Investigation Timeline</h3>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
          STAGE 05 / 06 COMPLETE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200 truncate">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
