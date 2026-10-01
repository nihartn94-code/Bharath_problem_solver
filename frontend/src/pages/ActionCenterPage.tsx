import React from 'react';
import { ActionCenterCard } from '../components/workspace/ActionCenterCard';
import { Investigation } from '../types';
import { approveActionApi } from '../services/api';

interface ActionCenterPageProps {
  investigations: Investigation[];
  onUpdateInvestigation: (inv: Investigation) => void;
}

export const ActionCenterPage: React.FC<ActionCenterPageProps> = ({
  investigations,
  onUpdateInvestigation
}) => {
  const current = investigations[0];
  if (!current) return null;

  const handleApprove = async (actionId: string) => {
    const updated = await approveActionApi(current.id, actionId);
    onUpdateInvestigation(updated);
  };

  const handleReject = async (actionId: string) => {
    const inv = { ...current };
    inv.actions.forEach(a => {
      if (a.id === actionId) a.status = 'REJECTED';
    });
    onUpdateInvestigation(inv);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
          HUMAN-IN-THE-LOOP CONTROL
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Action Center & Governance
        </h1>
        <p className="text-slate-300 text-sm">
          Review, approve, or reject recommended AI actions before execution into municipal or transit dispatch workflows.
        </p>
      </div>

      <ActionCenterCard
        actions={current.actions}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};
