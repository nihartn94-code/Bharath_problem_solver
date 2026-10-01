import React from 'react';
import { Activity, RefreshCw, CheckCircle2, TrendingDown, Clock } from 'lucide-react';
import { MonitoringState } from '../../types';

interface MonitoringCardProps {
  monitoring?: MonitoringState;
  onMonitorRefresh?: () => void;
}

export const MonitoringCard: React.FC<MonitoringCardProps> = ({
  monitoring,
  onMonitorRefresh
}) => {
  if (!monitoring) return null;

  return (
    <div className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder">
      <div className="flex items-center justify-between mb-6 border-b border-cardBorder pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="text-base font-bold text-white">TELEMETRY MONITORING & OUTCOME</h3>
        </div>

        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {monitoring.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-cardBorder">
          <span className="text-xs font-mono text-slate-400 block mb-1">METRIC MONITORED</span>
          <h4 className="text-sm font-bold text-white mb-3">{monitoring.metric_name}</h4>

          <div className="flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">BEFORE ACTION</span>
              <span className="text-rose-400 font-bold text-sm">{monitoring.value_before}</span>
            </div>

            <span className="text-slate-600">→</span>

            <div>
              <span className="text-slate-500 block text-[10px]">AFTER ACTION</span>
              <span className="text-emerald-400 font-bold text-sm">{monitoring.value_after || 'Updating...'}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-cardBorder flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">TELEMETRY TREND</span>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mt-1">
              <TrendingDown className="w-4 h-4" />
              <span>DISRUPTIVE IMPACT REDUCED BY 75%</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-3 border-t border-slate-800">
            <span>LAST CHECKED: {monitoring.last_check_time}</span>
            <button
              onClick={onMonitorRefresh}
              className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Re-Check Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* Agentic Loop Graphic */}
      <div className="p-3 rounded-xl bg-slate-950 border border-cardBorder text-center font-mono text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
        <span className="text-slate-500 font-bold">AGENTIC RECURSION:</span>
        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">INVESTIGATE</span>
        <span>→</span>
        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">ACT</span>
        <span>→</span>
        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">MONITOR</span>
        <span>→</span>
        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">RE-INVESTIGATE</span>
      </div>
    </div>
  );
};
