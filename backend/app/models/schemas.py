from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class CategoryEnum(str, Enum):
    BUS = "bus"
    GARBAGE = "garbage"
    TRAFFIC = "traffic"
    WATER = "water"
    APARTMENT = "apartment"
    HOSPITAL = "hospital"

class NodeTypeEnum(str, Enum):
    PROBLEM = "problem"
    CAUSE = "cause"
    EVENT = "event"
    ENTITY = "entity"
    IMPACT = "impact"
    ACTION = "action"

class ConfidenceLevel(str, Enum):
    CONFIRMED = "CONFIRMED"
    HIGH = "HIGH"
    PROBABLE = "PROBABLE"
    MEDIUM = "MEDIUM"
    POSSIBLE = "POSSIBLE"
    LOW = "LOW"
    UNKNOWN = "UNKNOWN"

class ActionStatusEnum(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    EXECUTED = "EXECUTED"

class InvestigationStatusEnum(str, Enum):
    ANALYZING = "ANALYZING"
    GRAPH_BUILDING = "GRAPH_BUILDING"
    INVESTIGATING = "INVESTIGATING"
    EVIDENCE_GATHERED = "EVIDENCE_GATHERED"
    ROOT_CAUSE_IDENTIFIED = "ROOT_CAUSE_IDENTIFIED"
    ACTION_REQUIRED = "ACTION_REQUIRED"
    ACTION_APPROVED = "ACTION_APPROVED"
    MONITORING = "MONITORING"
    RESOLVED = "RESOLVED"

class ProblemNode(BaseModel):
    id: str
    label: str
    category: CategoryEnum
    node_type: NodeTypeEnum
    description: str
    severity: Optional[str] = "MEDIUM"
    status: Optional[str] = "ACTIVE"
    data: Optional[Dict[str, Any]] = {}

class ProblemEdge(BaseModel):
    id: str
    source: str
    target: str
    label: str
    relationship_type: str = "causes"

class EvidenceItem(BaseModel):
    id: str
    source_tool: str
    title: str
    finding: str
    timestamp: str
    confidence: ConfidenceLevel
    related_node_ids: List[str] = []
    is_demo_data: bool = True

class RootCause(BaseModel):
    title: str
    description: str
    confidence: ConfidenceLevel
    supporting_evidence: List[str] = []
    alternative_explanations: List[str] = []

class ImpactAnalysis(BaseModel):
    affected_routes_count: int = 1
    affected_locations_count: int = 1
    estimated_people_affected: int = 100
    severity: str = "MEDIUM" # LOW, MEDIUM, HIGH, CRITICAL
    impact_chain: List[str] = []

class ActionItem(BaseModel):
    id: str
    title: str
    action_type: str = "immediate" # immediate, reporting, communication, monitoring
    description: str
    reason: str
    priority: str = "HIGH" # HIGH, MEDIUM, LOW
    status: ActionStatusEnum = ActionStatusEnum.PENDING

class AgentEvent(BaseModel):
    id: str
    timestamp: str
    stage: str
    message: str
    tool_called: Optional[str] = None
    result_summary: Optional[str] = None

class MonitoringState(BaseModel):
    metric_name: str
    value_before: str
    value_after: Optional[str] = None
    status: str = "STILL_ACTIVE" # IMPROVING, STILL_ACTIVE, RESOLVED
    last_check_time: str
    trend: str = "STABLE" # IMPROVING, STAGNANT, WORSENING

class CreateInvestigationRequest(BaseModel):
    input_text: str
    category: Optional[CategoryEnum] = None
    location: Optional[str] = "Bengaluru Urban"
    image_url: Optional[str] = None
    voice_note: Optional[str] = None

class ActionApprovalRequest(BaseModel):
    action_id: str
    approved: bool
    notes: Optional[str] = None

class Investigation(BaseModel):
    id: str
    title: str
    category: CategoryEnum
    input_text: str
    created_at: str
    updated_at: str
    location: str
    status: InvestigationStatusEnum
    nodes: List[ProblemNode] = []
    edges: List[ProblemEdge] = []
    evidence: List[EvidenceItem] = []
    root_cause: Optional[RootCause] = None
    impact: Optional[ImpactAnalysis] = None
    actions: List[ActionItem] = []
    agent_events: List[AgentEvent] = []
    monitoring: Optional[MonitoringState] = None
    is_simulated: bool = True
