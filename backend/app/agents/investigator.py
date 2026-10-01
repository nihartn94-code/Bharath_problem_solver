import random
import uuid
from datetime import datetime
from typing import Dict, Any, List, Optional
from app.config import settings
from app.models.schemas import (
    CategoryEnum, InvestigationStatusEnum, Investigation, ProblemNode, ProblemEdge,
    EvidenceItem, RootCause, ImpactAnalysis, ActionItem, AgentEvent, MonitoringState,
    ConfidenceLevel, ActionStatusEnum, NodeTypeEnum
)
from app.data.scenarios import SCENARIOS
from app.tools import simulated_tools

class AIProblemInvestigator:
    """Agentic AI Problem Investigation and Resolution Engine."""

    def classify_problem(self, input_text: str) -> CategoryEnum:
        text = input_text.lower()
        if any(w in text for w in ["water", "leak", "pipe", "flooding", "drain", "sewage"]):
            return CategoryEnum.WATER
        elif any(w in text for w in ["bus", "transit", "stop", "bmtc", "route", "commute", "shuttle"]):
            return CategoryEnum.BUS
        elif any(w in text for w in ["garbage", "trash", "waste", "collection", "smell", "dump", "bin"]):
            return CategoryEnum.GARBAGE
        elif any(w in text for w in ["traffic", "jam", "congestion", "signal", "road", "vehicle"]):
            return CategoryEnum.TRAFFIC
        elif any(w in text for w in ["lift", "elevator", "apartment", "flats", "rwa", "building"]):
            return CategoryEnum.APARTMENT
        elif any(w in text for w in ["hospital", "doctor", "opd", "appointment", "wait", "queue", "clinic"]):
            return CategoryEnum.HOSPITAL
        return CategoryEnum.WATER # Default fallback

    def create_investigation(
        self,
        input_text: str,
        category: Optional[CategoryEnum] = None,
        location: str = "Bengaluru Urban"
    ) -> Investigation:
        if not category:
            category = self.classify_problem(input_text)
        
        cat_key = category.value
        if cat_key in SCENARIOS:
            base_scenario = SCENARIOS[cat_key]
            # Copy base scenario structure with unique ID
            inv_id = f"INV-2026-{random.randint(100, 999)}"
            inv = Investigation(
                id=inv_id,
                title=base_scenario["title"],
                category=category,
                input_text=input_text or base_scenario["input_text"],
                created_at=datetime.now().isoformat(),
                updated_at=datetime.now().isoformat(),
                location=location or base_scenario["location"],
                status=InvestigationStatusEnum.ACTION_REQUIRED,
                nodes=[ProblemNode(**n) for n in base_scenario["nodes"]],
                edges=[ProblemEdge(**e) for e in base_scenario["edges"]],
                evidence=[EvidenceItem(**ev) for ev in base_scenario["evidence"]],
                root_cause=RootCause(**base_scenario["root_cause"]),
                impact=ImpactAnalysis(**base_scenario["impact"]),
                actions=[ActionItem(**a) for a in base_scenario["actions"]],
                agent_events=[AgentEvent(**ae) for ae in base_scenario["agent_events"]],
                monitoring=MonitoringState(**base_scenario["monitoring"]) if base_scenario.get("monitoring") else None,
                is_simulated=True
            )
            return inv
        else:
            # Fallback dynamic scenario generation
            return self._build_generic_investigation(input_text, category, location)

    def _build_generic_investigation(
        self,
        input_text: str,
        category: CategoryEnum,
        location: str
    ) -> Investigation:
        inv_id = f"INV-2026-{random.randint(100, 999)}"
        nodes = [
            ProblemNode(
                id="n-1",
                label=f"Root Cause: {category.value.capitalize()} System Fault",
                category=category,
                node_type=NodeTypeEnum.CAUSE,
                description=f"Primary hardware or administrative bottleneck in {category.value} infrastructure.",
                severity="HIGH"
            ),
            ProblemNode(
                id="n-2",
                label=f"Reported Symptom: {input_text[:30]}...",
                category=category,
                node_type=NodeTypeEnum.PROBLEM,
                description=input_text,
                severity="HIGH"
            ),
            ProblemNode(
                id="n-3",
                label="Public Impact & Commuter Delay",
                category=category,
                node_type=NodeTypeEnum.IMPACT,
                description="Downstream effect on local citizens and urban mobility.",
                severity="MEDIUM"
            )
        ]
        edges = [
            ProblemEdge(id="e-1", source="n-1", target="n-2", label="Triggers"),
            ProblemEdge(id="e-2", source="n-2", target="n-3", label="Impacts")
        ]
        evidence = [
            EvidenceItem(
                id=f"ev-{uuid.uuid4().hex[:6]}",
                source_tool="get_nearby_incidents",
                title="Telemetry Investigation Log",
                finding=f"Elevated disruption metric recorded for {location}.",
                timestamp=datetime.now().strftime("%I:%M %p"),
                confidence=ConfidenceLevel.HIGH,
                related_node_ids=["n-1", "n-2"],
                is_demo_data=True
            )
        ]
        root_cause = RootCause(
            title=f"Infrastructure Anomaly in {category.value.capitalize()} System",
            description=f"Automated tool telemetry indicates operational bottleneck associated with '{input_text}'.",
            confidence=ConfidenceLevel.PROBABLE,
            supporting_evidence=["Local incident report log", "Telemetry anomaly threshold crossed"],
            alternative_explanations=["Weather-induced temporary delay"]
        )
        impact = ImpactAnalysis(
            affected_routes_count=1,
            affected_locations_count=2,
            estimated_people_affected=85,
            severity="MEDIUM",
            impact_chain=["System Anomaly", "Reported Symptom", "Local Citizen Impact"]
        )
        actions = [
            ActionItem(
                id=f"act-{uuid.uuid4().hex[:6]}",
                title=f"Dispatch {category.value.capitalize()} Response Team",
                action_type="immediate",
                description=f"Issue dispatch command for maintenance crew in {location}.",
                reason="Directly mitigates reported symptom and halts downstream disruption.",
                priority="HIGH",
                status=ActionStatusEnum.PENDING
            )
        ]
        agent_events = [
            AgentEvent(id="ae-1", timestamp=datetime.now().strftime("%I:%M:%S %p"), stage="01 - Understand", message=f"Input parsed and classified as {category.value.upper()}."),
            AgentEvent(id="ae-2", timestamp=datetime.now().strftime("%I:%M:%S %p"), stage="02 - Investigate", message="Invoking simulated telemetry tools..."),
            AgentEvent(id="ae-3", timestamp=datetime.now().strftime("%I:%M:%S %p"), stage="03 - Connect", message="Generated dynamic Problem Graph."),
            AgentEvent(id="ae-4", timestamp=datetime.now().strftime("%I:%M:%S %p"), stage="05 - Act", message="Action plan ready for human approval.")
        ]

        return Investigation(
            id=inv_id,
            title=f"{category.value.capitalize()} Investigation at {location}",
            category=category,
            input_text=input_text,
            created_at=datetime.now().isoformat(),
            updated_at=datetime.now().isoformat(),
            location=location,
            status=InvestigationStatusEnum.ACTION_REQUIRED,
            nodes=nodes,
            edges=edges,
            evidence=evidence,
            root_cause=root_cause,
            impact=impact,
            actions=actions,
            agent_events=agent_events,
            monitoring=MonitoringState(
                metric_name="Incident Severity",
                value_before="HIGH",
                value_after="LOW",
                status="IMPROVING",
                last_check_time="Just now",
                trend="IMPROVING"
            ),
            is_simulated=True
        )

    def approve_action(self, investigation: Investigation, action_id: str) -> Investigation:
        """Human approval step for human-in-the-loop governance."""
        for act in investigation.actions:
            if act.id == action_id:
                act.status = ActionStatusEnum.APPROVED
        
        investigation.status = InvestigationStatusEnum.ACTION_APPROVED
        investigation.updated_at = datetime.now().isoformat()
        
        # Append agent event
        investigation.agent_events.append(
            AgentEvent(
                id=f"ae-{uuid.uuid4().hex[:4]}",
                timestamp=datetime.now().strftime("%I:%M:%S %p"),
                stage="05 - Human Approval",
                message=f"Action '{action_id}' APPROVED by operator. Executing resolution workflow...",
            )
        )
        return investigation

    def reject_action(self, investigation: Investigation, action_id: str) -> Investigation:
        for act in investigation.actions:
            if act.id == action_id:
                act.status = ActionStatusEnum.REJECTED
        
        investigation.updated_at = datetime.now().isoformat()
        investigation.agent_events.append(
            AgentEvent(
                id=f"ae-{uuid.uuid4().hex[:4]}",
                timestamp=datetime.now().strftime("%I:%M:%S %p"),
                stage="05 - Human Approval",
                message=f"Action '{action_id}' REJECTED by operator. Re-evaluating alternative actions.",
            )
        )
        return investigation

    def trigger_monitoring(self, investigation: Investigation) -> Investigation:
        """Monitors outcome after action execution and updates Problem Graph state."""
        investigation.status = InvestigationStatusEnum.RESOLVED
        investigation.updated_at = datetime.now().isoformat()
        
        if investigation.monitoring:
            investigation.monitoring.status = "RESOLVED"
            investigation.monitoring.trend = "IMPROVING"
            investigation.monitoring.last_check_time = datetime.now().strftime("%I:%M %p")
        
        # Mark nodes as resolved/improving
        for n in investigation.nodes:
            if n.node_type in [NodeTypeEnum.PROBLEM, NodeTypeEnum.EVENT]:
                n.status = "RESOLVED"
                n.severity = "LOW"
        
        investigation.agent_events.append(
            AgentEvent(
                id=f"ae-{uuid.uuid4().hex[:4]}",
                timestamp=datetime.now().strftime("%I:%M:%S %p"),
                stage="06 - Monitor & Update",
                message="Monitored telemetric recovery: Disruption metric returned to normal baseline. Problem Graph updated.",
            )
        )
        return investigation

investigator_engine = AIProblemInvestigator()
