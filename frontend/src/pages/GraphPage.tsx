import React from 'react';
import { ProblemGraphView } from '../components/workspace/ProblemGraphView';
import { Investigation } from '../types';

interface GraphPageProps {
  investigation: Investigation;
}

export const GraphPage: React.FC<GraphPageProps> = ({ investigation }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          SYSTEM GRAPH VIEW
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Problem Graph Workspace
        </h1>
        <p className="text-slate-300 text-sm">
          Displaying systemic nodes for <span className="text-cyan-300 font-bold">{investigation.title}</span>. Drag nodes, zoom, pan, and click to inspect attributes.
        </p>
      </div>

      <ProblemGraphView nodes={investigation.nodes} edges={investigation.edges} />
    </div>
  );
};
