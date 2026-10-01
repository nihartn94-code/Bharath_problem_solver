import React from 'react';
import { Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import { AgentEvent } from '../../types';

interface AgentActivityFeedProps {
  events: AgentEvent[];
}

export const AgentActivityFeed: React.FC<AgentActivityFeedProps> = ({ events }) => {
  return (
    <div className="p-5 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-cardBorder pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            AGENT ACTIVITY
          </h3>
        </div>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
      </div>

      <div className="space-y-3 font-mono text-xs overflow-y-auto max-h-[500px] pr-1">
        {events.map((evt, idx) => (
          <div
            key={evt.id || idx}
            className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/30 transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-cyan-400 font-bold">{evt.timestamp}</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                {evt.stage}
              </span>
            </div>

            <p className="text-slate-200 leading-snug font-sans text-xs">{evt.message}</p>

            {evt.tool_called && (
              <div className="pt-1 flex items-center gap-1 text-[10px] text-purple-300">
                <ArrowUpRight className="w-3 h-3 text-purple-400" />
                <span>Tool Executed: {evt.tool_called}()</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
