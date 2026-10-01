import React from 'react';
import { ShieldCheck, FileText, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { EvidenceItem } from '../../types';

interface EvidencePanelProps {
  evidence: EvidenceItem[];
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ evidence }) => {
  const getConfidenceBadge = (conf: string) => {
    switch (conf) {
      case 'CONFIRMED':
      case 'HIGH':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'MEDIUM':
      case 'PROBABLE':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder">
      <div className="flex items-center justify-between mb-6 border-b border-cardBorder pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <h3 className="text-base font-bold text-white">Evidence Collected ({evidence.length})</h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
          MULTIDOMAIN TELEMETRY LOGS
        </span>
      </div>

      <div className="space-y-4">
        {evidence.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-900/80 border border-cardBorder hover:border-blue-500/40 transition-all space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                TOOL: {item.source_tool}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">{item.timestamp}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getConfidenceBadge(item.confidence)}`}>
                  {item.confidence} CONFIDENCE
                </span>
              </div>
            </div>

            <h4 className="text-sm font-bold text-white">{item.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.finding}</p>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>RELATED NODES: {item.related_node_ids?.join(', ') || 'N/A'}</span>
              {item.is_demo_data && (
                <span className="text-amber-400/90 italic">Demo Telemetry Data</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
