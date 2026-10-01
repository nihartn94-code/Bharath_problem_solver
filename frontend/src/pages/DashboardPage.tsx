import React from 'react';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { ActiveInvestigationsTable } from '../components/dashboard/ActiveInvestigationsTable';
import { CategoryBreakdownChart } from '../components/dashboard/CategoryBreakdownChart';
import { AgentActivityFeed } from '../components/workspace/AgentActivityFeed';
import { Investigation } from '../types';

interface DashboardPageProps {
  investigations: Investigation[];
  onOpenWorkspace: (inv: Investigation) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  investigations,
  onOpenWorkspace
}) => {
  const activeCount = investigations.filter(i => i.status !== 'RESOLVED').length;
  const resolvedCount = investigations.filter(i => i.status === 'RESOLVED').length;
  const recentEvents = investigations.flatMap(i => i.agent_events).slice(-8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          COMMAND CENTER DASHBOARD
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Civic Problem & Disruption Overview
        </h1>
      </div>

      {/* Top 4 Stats */}
      <StatsGrid
        activeCount={activeCount || 6}
        problemsCount={24}
        connectedCount={41}
        resolvedCount={resolvedCount || 17}
      />

      {/* Main Grid: Active Investigations Table + Sidebar Charts & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActiveInvestigationsTable
            investigations={investigations}
            onOpenWorkspace={onOpenWorkspace}
          />
        </div>

        <div className="space-y-8">
          <CategoryBreakdownChart />
          <AgentActivityFeed events={recentEvents} />
        </div>
      </div>
    </div>
  );
};
