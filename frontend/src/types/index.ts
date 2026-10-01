export type CategoryType = 'bus' | 'garbage' | 'traffic' | 'water' | 'apartment' | 'hospital';

export type NodeType = 'problem' | 'cause' | 'event' | 'entity' | 'impact' | 'action';

export type ConfidenceType = 'CONFIRMED' | 'HIGH' | 'PROBABLE' | 'MEDIUM' | 'POSSIBLE' | 'LOW' | 'UNKNOWN';

export type ActionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED';

export type InvestigationStatus = 
  | 'ANALYZING' 
  | 'GRAPH_BUILDING' 
  | 'INVESTIGATING' 
  | 'EVIDENCE_GATHERED' 
  | 'ROOT_CAUSE_IDENTIFIED' 
  | 'ACTION_REQUIRED' 
  | 'ACTION_APPROVED' 
  | 'MONITORING' 
  | 'RESOLVED';

export interface ProblemNode {
  id: string;
  label: string;
  category: CategoryType;
  node_type: NodeType;
  description: string;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status?: string;
  data?: Record<string, any>;
}

export interface ProblemEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  relationship_type?: string;
}

export interface EvidenceItem {
  id: string;
  source_tool: string;
  title: string;
  finding: string;
  timestamp: string;
  confidence: ConfidenceType;
  related_node_ids?: string[];
  is_demo_data?: boolean;
}

export interface RootCause {
  title: string;
  description: string;
  confidence: ConfidenceType;
  supporting_evidence: string[];
  alternative_explanations: string[];
}

export interface ImpactAnalysis {
  affected_routes_count: number;
  affected_locations_count: number;
  estimated_people_affected: number;
  severity: string;
  impact_chain: string[];
}

export interface ActionItem {
  id: string;
  title: string;
  action_type: string;
  description: string;
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: ActionStatus;
}

export interface AgentEvent {
  id: string;
  timestamp: string;
  stage: string;
  message: string;
  tool_called?: string;
  result_summary?: string;
}

export interface MonitoringState {
  metric_name: string;
  value_before: string;
  value_after?: string;
  status: 'IMPROVING' | 'STILL_ACTIVE' | 'RESOLVED';
  last_check_time: string;
  trend: 'IMPROVING' | 'STAGNANT' | 'WORSENING';
}

export interface Investigation {
  id: string;
  title: string;
  category: CategoryType;
  input_text: string;
  created_at: string;
  updated_at: string;
  location: string;
  status: InvestigationStatus;
  nodes: ProblemNode[];
  edges: ProblemEdge[];
  evidence: EvidenceItem[];
  root_cause?: RootCause;
  impact?: ImpactAnalysis;
  actions: ActionItem[];
  agent_events: AgentEvent[];
  monitoring?: MonitoringState;
  is_simulated: boolean;
}
