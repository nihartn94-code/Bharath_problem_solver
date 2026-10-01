import React from 'react';
import { Activity, MapPin, Navigation, Users, ArrowRight } from 'lucide-react';
import { ImpactAnalysis } from '../../types';

interface ImpactAnalysisCardProps {
  impact?: ImpactAnalysis;
}

export const ImpactAnalysisCard: React.FC<ImpactAnalysisCardProps> = ({ impact }) => {
  if (!impact) return null;

  return (
    <div className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder">
      <div className="flex items-center justify-between mb-6 border-b border-cardBorder pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-bold text-white">SYSTEM IMPACT ANALYSIS</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase">
          SEVERITY: {impact.severity}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-cardBorder text-center">
          <span className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1 mb-1">
            <Navigation className="w-3.5 h-3.5 text-blue-400" /> AFFECTED ROUTES
          </span>
          <span className="text-2xl font-black text-white">{impact.affected_routes_count}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-cardBorder text-center">
          <span className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> AFFECTED LOCATIONS
          </span>
          <span className="text-2xl font-black text-white">{impact.affected_locations_count}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-cardBorder text-center">
          <span className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1 mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> ESTIMATED CITIZENS AFFECTED
          </span>
          <span className="text-2xl font-black text-emerald-400">{impact.estimated_people_affected}</span>
        </div>
      </div>

      {/* Visual Impact Propagation Chain */}
      <div>
        <span className="text-xs font-mono font-bold text-slate-400 block uppercase mb-3">
          IMPACT PROPAGATION CHAIN
        </span>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {impact.impact_chain.map((step, idx) => (
            <React.Fragment key={idx}>
              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                {step}
              </span>
              {idx < impact.impact_chain.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
