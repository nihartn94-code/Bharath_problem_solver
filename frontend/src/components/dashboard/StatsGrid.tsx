import React from 'react';
import { Search, AlertOctagon, Network, CheckCircle2 } from 'lucide-react';

interface StatsGridProps {
  activeCount: number;
  problemsCount: number;
  connectedCount: number;
  resolvedCount: number;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  activeCount = 6,
  problemsCount = 24,
  connectedCount = 41,
  resolvedCount = 17
}) => {
  const stats = [
    { label: 'Active Investigations', value: activeCount, icon: Search, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { label: 'Problems Detected', value: problemsCount, icon: AlertOctagon, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
    { label: 'Connected Issues', value: connectedCount, icon: Network, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { label: 'Resolved & Monitored', value: resolvedCount, icon: CheckCircle2, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((st, idx) => {
        const Icon = st.icon;
        return (
          <div key={idx} className="p-5 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase font-bold">{st.label}</span>
              <span className="text-3xl font-extrabold text-white">{st.value}</span>
            </div>
            <div className={`p-3 rounded-xl border ${st.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
