import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Play } from 'lucide-react';
import { ActionItem } from '../../types';

interface ActionCenterCardProps {
  actions: ActionItem[];
  onApprove: (actionId: string) => void;
  onReject: (actionId: string) => void;
}

export const ActionCenterCard: React.FC<ActionCenterCardProps> = ({
  actions,
  onApprove,
  onReject,
}) => {
  return (
    <div className="p-6 rounded-2xl glass-panel-glow bg-gradient-to-br from-cardBg via-slate-900 to-cyan-950/60 border border-cyan-500/40 shadow-xl">
      <div className="flex items-center justify-between mb-6 border-b border-cardBorder pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">RECOMMENDED ACTION PLAN</h3>
        </div>
        <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800 uppercase font-bold">
          HUMAN APPROVAL REQUIRED
        </span>
      </div>

      {/* Human-in-the-loop Governance Banner */}
      <div className="p-4 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-200 font-mono mb-6 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
        <div>
          <span className="font-bold text-white block">HUMAN-IN-THE-LOOP SAFETY GATE</span>
          <span>The AI agent has prepared this action. Confirm operator authorization to execute telemetry dispatch.</span>
        </div>
      </div>

      <div className="space-y-4">
        {actions.map((act) => {
          const isApproved = act.status === 'APPROVED';
          const isRejected = act.status === 'REJECTED';

          return (
            <div
              key={act.id}
              className={`p-5 rounded-xl border transition-all ${
                isApproved
                  ? 'bg-emerald-950/40 border-emerald-500/50'
                  : isRejected
                  ? 'bg-rose-950/40 border-rose-500/50'
                  : 'bg-slate-900/80 border-cardBorder hover:border-cyan-500/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
                    {act.action_type}
                  </span>
                  <h4 className="text-sm font-bold text-white">{act.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    PRIORITY: {act.priority}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    isApproved ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : isRejected ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-amber-500/20 text-amber-300 border-amber-500'
                  }`}>
                    {act.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-2 leading-relaxed">{act.description}</p>
              
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono text-slate-400 mb-4">
                <span className="text-cyan-400 font-semibold">REASONING: </span>
                <span>{act.reason}</span>
              </div>

              {/* Approval Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/60">
                {!isApproved && !isRejected ? (
                  <>
                    <button
                      onClick={() => onApprove(act.id)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve Action</span>
                    </button>

                    <button
                      onClick={() => onReject(act.id)}
                      className="px-4 py-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </>
                ) : isApproved ? (
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Action Approved & Telemetry Dispatched to System</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                    <XCircle className="w-4 h-4" />
                    <span>Action Rejected by Operator</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
