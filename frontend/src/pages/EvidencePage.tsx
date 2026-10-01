import React from 'react';
import { EvidencePanel } from '../components/workspace/EvidencePanel';
import { Investigation } from '../types';

interface EvidencePageProps {
  investigations: Investigation[];
}

export const EvidencePage: React.FC<EvidencePageProps> = ({ investigations }) => {
  const allEvidence = investigations.flatMap(i => i.evidence);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
          TELEMETRY LOGS & FINDINGS
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Evidence Repository
        </h1>
        <p className="text-slate-300 text-sm">
          Aggregated evidence collected across active civic telemetry tools, municipal databases, and traffic sensors.
        </p>
      </div>

      <EvidencePanel evidence={allEvidence} />
    </div>
  );
};
