import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

export const DemoBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400">
      <Cpu className="w-3.5 h-3.5 animate-pulse" />
      <span>DEMO MODE • Simulated Telemetry</span>
    </div>
  );
};
