import React from 'react';
import { Target, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { RootCause } from '../../types';

interface RootCauseCardProps {
  rootCause?: RootCause;
}

export const RootCauseCard: React.FC<RootCauseCardProps> = ({ rootCause }) => {
  if (!rootCause) return null;

  return (
    <div className="p-6 rounded-2xl glass-panel-glow bg-gradient-to-br from-cardBg via-slate-900 to-indigo-950/80 border border-purple-500/40 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-cardBorder pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-widest block">
              AI ROOT CAUSE IDENTIFICATION
            </span>
            <h3 className="text-lg font-extrabold text-white">PROBABLE ROOT CAUSE</h3>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/50 uppercase">
          CONFIDENCE: {rootCause.confidence}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-base font-bold text-purple-200 mb-1">{rootCause.title}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {rootCause.description}
          </p>
        </div>

        {/* Supporting Evidence List */}
        <div>
          <span className="text-xs font-mono font-bold text-slate-400 block uppercase mb-2">
            SUPPORTING EVIDENCE ({rootCause.supporting_evidence.length})
          </span>
          <div className="space-y-1.5">
            {rootCause.supporting_evidence.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Explanations */}
        {rootCause.alternative_explanations.length > 0 && (
          <div className="pt-3 border-t border-cardBorder/60">
            <span className="text-xs font-mono font-bold text-slate-400 block uppercase mb-2">
              ALTERNATIVE EXPLANATIONS EVALUATED
            </span>
            <div className="space-y-1">
              {rootCause.alternative_explanations.map((alt, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-amber-400">•</span>
                  <span>{alt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>AI Hypothesis evaluated against multi-source telemetry data. Human verification recommended prior to execution.</span>
        </div>
      </div>
    </div>
  );
};
