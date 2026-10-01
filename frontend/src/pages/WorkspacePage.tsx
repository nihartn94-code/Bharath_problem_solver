import React, { useState } from 'react';
import { AgentTimeline } from '../components/workspace/AgentTimeline';
import { ProblemGraphView } from '../components/workspace/ProblemGraphView';
import { EvidencePanel } from '../components/workspace/EvidencePanel';
import { RootCauseCard } from '../components/workspace/RootCauseCard';
import { ImpactAnalysisCard } from '../components/workspace/ImpactAnalysisCard';
import { ActionCenterCard } from '../components/workspace/ActionCenterCard';
import { MonitoringCard } from '../components/workspace/MonitoringCard';
import { AgentActivityFeed } from '../components/workspace/AgentActivityFeed';
import { Investigation } from '../types';
import { approveActionApi, triggerMonitoringApi } from '../services/api';
import { ArrowLeft, RefreshCw, ShieldCheck, MapPin, Tag } from 'lucide-react';

interface WorkspacePageProps {
  investigation: Investigation;
  onUpdateInvestigation: (inv: Investigation) => void;
  onBack: () => void;
}

export const WorkspacePage: React.FC<WorkspacePageProps> = ({
  investigation,
  onUpdateInvestigation,
  onBack
}) => {
  const [currentInv, setCurrentInv] = useState<Investigation>(investigation);
  const [activeTab, setActiveTab] = useState<'overview' | 'graph' | 'evidence' | 'actions'>('overview');

  const handleApprove = async (actionId: string) => {
    const updated = await approveActionApi(currentInv.id, actionId);
    setCurrentInv({ ...updated });
    onUpdateInvestigation({ ...updated });

    // Trigger monitoring update loop after 1.5 seconds
    setTimeout(async () => {
      const monitored = await triggerMonitoringApi(currentInv.id);
      setCurrentInv({ ...monitored });
      onUpdateInvestigation({ ...monitored });
    }, 1500);
  };

  const handleReject = async (actionId: string) => {
    // Local reject state
    const inv = { ...currentInv };
    inv.actions.forEach(a => {
      if (a.id === actionId) a.status = 'REJECTED';
    });
    setCurrentInv(inv);
    onUpdateInvestigation(inv);
  };

  const handleRefreshMonitor = async () => {
    const monitored = await triggerMonitoringApi(currentInv.id);
    setCurrentInv({ ...monitored });
    onUpdateInvestigation({ ...monitored });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation & Metadata Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cardBorder pb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
              ID: {currentInv.id}
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 uppercase flex items-center gap-1">
              <Tag className="w-3 h-3" /> {currentInv.category}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" /> {currentInv.location}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {currentInv.title}
          </h1>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-cardBg border border-cyan-500/40 text-center">
            <span className="text-[10px] font-mono text-slate-400 block font-semibold uppercase">INVESTIGATION STATE</span>
            <span className="text-sm font-mono font-bold text-cyan-300 uppercase">{currentInv.status}</span>
          </div>
        </div>
      </div>

      {/* Input Complaint Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-cardBorder flex items-center justify-between">
        <div className="text-xs">
          <span className="text-slate-400 font-mono block text-[10px] font-bold">USER COMPLAINT SYMPTOM:</span>
          <p className="text-amber-300 font-semibold text-sm italic">“{currentInv.input_text}”</p>
        </div>
        <div className="text-xs font-mono text-cyan-400 hidden sm:block">
          {currentInv.nodes.length} Graph Nodes Discovered
        </div>
      </div>

      {/* Agent Reasoning Timeline */}
      <AgentTimeline events={currentInv.agent_events} />

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 border-b border-cardBorder pb-2">
        {(['overview', 'graph', 'evidence', 'actions'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              activeTab === tab
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab === 'overview' && 'Full Workspace Overview'}
            {tab === 'graph' && 'Interactive Problem Graph'}
            {tab === 'evidence' && `Evidence Logs (${currentInv.evidence.length})`}
            {tab === 'actions' && `Human Action Plan (${currentInv.actions.length})`}
          </button>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Dynamic Tab Content */}
        <div className="lg:col-span-2 space-y-8">
          {(activeTab === 'overview' || activeTab === 'graph') && (
            <ProblemGraphView nodes={currentInv.nodes} edges={currentInv.edges} />
          )}

          {(activeTab === 'overview' || activeTab === 'evidence') && (
            <EvidencePanel evidence={currentInv.evidence} />
          )}

          {activeTab === 'overview' && (
            <>
              <RootCauseCard rootCause={currentInv.root_cause} />
              <ImpactAnalysisCard impact={currentInv.impact} />
            </>
          )}

          {(activeTab === 'overview' || activeTab === 'actions') && (
            <ActionCenterCard
              actions={currentInv.actions}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}

          {currentInv.monitoring && (
            <MonitoringCard
              monitoring={currentInv.monitoring}
              onMonitorRefresh={handleRefreshMonitor}
            />
          )}
        </div>

        {/* Right 1 Column: Agent Activity Feed & Metadata */}
        <div className="space-y-8">
          <AgentActivityFeed events={currentInv.agent_events} />
        </div>
      </div>
    </div>
  );
};
