import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ProblemNode, ProblemEdge, NodeType } from '../../types';
import { AlertCircle, Target, Activity, Users, CheckCircle2, ShieldAlert, X } from 'lucide-react';

interface ProblemGraphViewProps {
  nodes: ProblemNode[];
  edges: ProblemEdge[];
  onNodeClick?: (node: ProblemNode) => void;
}

const getNodeStyle = (type: NodeType) => {
  switch (type) {
    case 'cause':
      return {
        background: '#1E1B4B',
        border: '2px solid #818CF8',
        color: '#EEF2FF',
        shadow: '0 0 15px rgba(129, 140, 248, 0.4)'
      };
    case 'problem':
      return {
        background: '#451A03',
        border: '2px solid #F59E0B',
        color: '#FEF3C7',
        shadow: '0 0 15px rgba(245, 158, 11, 0.4)'
      };
    case 'event':
      return {
        background: '#311042',
        border: '2px solid #C084FC',
        color: '#F3E8FF',
        shadow: '0 0 15px rgba(192, 132, 252, 0.4)'
      };
    case 'impact':
      return {
        background: '#881337',
        border: '2px solid #FB7185',
        color: '#FFE4E6',
        shadow: '0 0 15px rgba(251, 113, 133, 0.4)'
      };
    case 'action':
      return {
        background: '#064E3B',
        border: '2px solid #34D399',
        color: '#ECFDF5',
        shadow: '0 0 15px rgba(52, 211, 153, 0.4)'
      };
    default:
      return {
        background: '#0F172A',
        border: '2px solid #38BDF8',
        color: '#F0F9FF',
        shadow: '0 0 15px rgba(56, 189, 248, 0.4)'
      };
  }
};

export const ProblemGraphView: React.FC<ProblemGraphViewProps> = ({ nodes, edges, onNodeClick }) => {
  const [selectedNode, setSelectedNode] = useState<ProblemNode | null>(null);

  // Convert schema nodes to React Flow nodes with auto layout positions
  const initialNodes: Node[] = useMemo(() => {
    return nodes.map((n, idx) => {
      const style = getNodeStyle(n.node_type);
      return {
        id: n.id,
        position: { x: 120 + (idx % 3) * 280, y: 80 + Math.floor(idx / 3) * 160 },
        data: {
          label: (
            <div className="p-3 font-sans max-w-[220px]">
              <div className="flex items-center justify-between gap-2 mb-1 text-[10px] font-mono font-bold uppercase opacity-80">
                <span>{n.node_type}</span>
                <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10">{n.category}</span>
              </div>
              <div className="font-bold text-xs leading-snug">{n.label}</div>
              <p className="text-[10px] opacity-75 mt-1 line-clamp-2">{n.description}</p>
            </div>
          )
        },
        style: {
          background: style.background,
          border: style.border,
          color: style.color,
          borderRadius: '12px',
          boxShadow: style.shadow,
          cursor: 'pointer'
        }
      };
    });
  }, [nodes]);

  const initialEdges: Edge[] = useMemo(() => {
    return edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      animated: true,
      style: { stroke: '#38BDF8', strokeWidth: 2 },
      labelStyle: { fill: '#94A3B8', fontSize: 10, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#060913', fillOpacity: 0.8 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#38BDF8',
      }
    }));
  }, [edges]);

  const [rfNodes, setRfNodes] = useState<Node[]>(initialNodes);
  const [rfEdges, setRfEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: any) => setRfNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setRfEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const handleNodeClick = (_: any, node: Node) => {
    const original = nodes.find((n) => n.id === node.id);
    if (original) {
      setSelectedNode(original);
      if (onNodeClick) onNodeClick(original);
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-2xl glass-panel-glow bg-slate-950 border border-cardBorder overflow-hidden">
      {/* Top Controls Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cardBg/90 backdrop-blur-md border border-cardBorder pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-200">INTERACTIVE PROBLEM GRAPH</span>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            REACT FLOW
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-xl bg-cardBg/90 backdrop-blur-md border border-cardBorder text-[10px] font-mono text-slate-300 pointer-events-auto">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-400" /> Cause</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Problem</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400" /> Event</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" /> Impact</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Action</span>
        </div>
      </div>

      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#334155" />
        <Controls className="bg-slate-900 border-slate-700 text-slate-300" />
      </ReactFlow>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="absolute bottom-4 right-4 z-20 w-80 p-4 rounded-2xl glass-panel-glow bg-cardBg/95 border border-cyan-500/40 shadow-2xl text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold uppercase text-cyan-400 text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
              {selectedNode.node_type} • {selectedNode.category}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="text-sm font-bold text-white mb-1">{selectedNode.label}</h4>
          <p className="text-slate-300 text-xs mb-3">{selectedNode.description}</p>

          <div className="pt-2 border-t border-cardBorder flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>SEVERITY: {selectedNode.severity || 'HIGH'}</span>
            <span>STATUS: {selectedNode.status || 'ACTIVE'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
