import React from 'react';
import { ArrowRight, Bus, Trash2, TrafficCone, Droplet, Building2, Stethoscope, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Investigation, CategoryType } from '../../types';

interface ActiveInvestigationsTableProps {
  investigations: Investigation[];
  onOpenWorkspace: (inv: Investigation) => void;
}

const getCategoryIcon = (cat: CategoryType) => {
  switch (cat) {
    case 'bus': return Bus;
    case 'garbage': return Trash2;
    case 'traffic': return TrafficCone;
    case 'water': return Droplet;
    case 'apartment': return Building2;
    case 'hospital': return Stethoscope;
    default: return Droplet;
  }
};

export const ActiveInvestigationsTable: React.FC<ActiveInvestigationsTableProps> = ({
  investigations,
  onOpenWorkspace
}) => {
  return (
    <div className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder">
      <div className="flex items-center justify-between mb-6 border-b border-cardBorder pb-3">
        <h3 className="text-lg font-extrabold text-white">Active Investigations ({investigations.length})</h3>
        <span className="text-xs font-mono text-cyan-400">AUTOMATED ENGINE ACTIVE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investigations.map((inv) => {
          const Icon = getCategoryIcon(inv.category);
          return (
            <div
              key={inv.id}
              className="p-5 rounded-xl bg-slate-900/80 border border-cardBorder hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                      {inv.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {inv.status}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-cyan-400 block font-bold mb-1">
                  ID: {inv.id} • {inv.location}
                </span>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">{inv.title}</h4>

                {inv.root_cause && (
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300">
                    <span className="text-purple-400 font-bold block text-[9px] uppercase">Probable Cause:</span>
                    <p className="truncate">{inv.root_cause.title}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {inv.impact?.estimated_people_affected || 100} Citizens Affected
                </span>

                <button
                  onClick={() => onOpenWorkspace(inv)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-1"
                >
                  <span>Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
