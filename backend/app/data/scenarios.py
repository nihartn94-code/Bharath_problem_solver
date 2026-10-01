from typing import Dict, List, Any
from datetime import datetime
from app.models.schemas import (
    CategoryEnum, InvestigationStatusEnum, ProblemNode, ProblemEdge,
    EvidenceItem, RootCause, ImpactAnalysis, ActionItem, AgentEvent,
    MonitoringState, ConfidenceLevel, ActionStatusEnum, NodeTypeEnum
)

SCENARIOS: Dict[str, Dict[str, Any]] = {
    "water": {
        "id": "INV-2026-001",
        "title": "Water Pipeline Leakage & Road Flooding",
        "category": CategoryEnum.WATER,
        "input_text": "There is water flooding the road near my apartment.",
        "location": "Apartment Road, Koramangala, Bengaluru",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "status": InvestigationStatusEnum.ACTION_REQUIRED,
        "is_simulated": True,
        "nodes": [
            {
                "id": "node-cause",
                "label": "Main Pipeline Leak",
                "category": CategoryEnum.WATER,
                "node_type": NodeTypeEnum.CAUSE,
                "description": "Feeder Line 4B burst due to high pressure and aging infrastructure (18 years old).",
                "severity": "HIGH",
                "status": "ACTIVE",
                "data": {"tool": "get_water_infrastructure_status", "leak_rate": "120 L/min"}
            },
            {
                "id": "node-problem",
                "label": "Road Flooding",
                "category": CategoryEnum.WATER,
                "node_type": NodeTypeEnum.PROBLEM,
                "description": "3-inch standing water accumulation across 300m stretch outside residential complex.",
                "severity": "HIGH",
                "status": "ACTIVE",
                "data": {"water_depth": "3 inches", "length": "300 meters"}
            },
            {
                "id": "node-traffic",
                "label": "Traffic Congestion",
                "category": CategoryEnum.TRAFFIC,
                "node_type": NodeTypeEnum.EVENT,
                "description": "Vehicles slowing down to navigate waterlogged lanes, causing 1.4km tailback.",
                "severity": "MEDIUM",
                "status": "ACTIVE",
                "data": {"tailback": "1.4 km", "avg_speed": "6.5 km/h"}
            },
            {
                "id": "node-bus",
                "label": "Bus Transit Delay",
                "category": CategoryEnum.BUS,
                "node_type": NodeTypeEnum.EVENT,
                "description": "Route 500-D buses stranded in congestion, leading to a 40-minute arrival gap.",
                "severity": "MEDIUM",
                "status": "ACTIVE",
                "data": {"route": "500-D", "delay": "40 mins"}
            },
            {
                "id": "node-impact",
                "label": "120 Passengers Affected",
                "category": CategoryEnum.WATER,
                "node_type": NodeTypeEnum.IMPACT,
                "description": "Commuters stranded at Silk Board and Koramangala bus stops during peak morning commute.",
                "severity": "HIGH",
                "status": "ACTIVE",
                "data": {"citizens_impacted": 120}
            }
        ],
        "edges": [
            {"id": "e1", "source": "node-cause", "target": "node-problem", "label": "Causes", "relationship_type": "causes"},
            {"id": "e2", "source": "node-problem", "target": "node-traffic", "label": "Leads to", "relationship_type": "leads_to"},
            {"id": "e3", "source": "node-traffic", "target": "node-bus", "label": "Causes delay in", "relationship_type": "delays"},
            {"id": "e4", "source": "node-bus", "target": "node-impact", "label": "Impacts", "relationship_type": "impacts"}
        ],
        "evidence": [
            {
                "id": "ev-1",
                "source_tool": "get_water_infrastructure_status",
                "title": "Pipeline Sensor #104 Alert",
                "finding": "Pressure drop of 28.5 PSI detected on Feeder Line 4B. Estimated leak rate: 120 Liters/min.",
                "timestamp": "10:42 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-cause"],
                "is_demo_data": True
            },
            {
                "id": "ev-2",
                "source_tool": "get_nearby_incidents",
                "title": "Incident INC-8892 Logged",
                "finding": "Road waterlogging confirmed at Apartment Road. 3-inch standing water blocking left two lanes.",
                "timestamp": "10:43 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-problem"],
                "is_demo_data": True
            },
            {
                "id": "ev-3",
                "source_tool": "get_traffic_status",
                "title": "Congestion Telemetry",
                "finding": "Traffic Congestion Index peaked at 8.7/10. Average vehicle speed reduced to 6.5 km/h.",
                "timestamp": "10:44 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-traffic"],
                "is_demo_data": True
            },
            {
                "id": "ev-4",
                "source_tool": "get_bus_status",
                "title": "Route 500-D GPS Lag",
                "finding": "Bus arrival delayed by 40 minutes due to bottleneck at flooded section.",
                "timestamp": "10:45 AM",
                "confidence": ConfidenceLevel.MEDIUM,
                "related_node_ids": ["node-bus", "node-impact"],
                "is_demo_data": True
            }
        ],
        "root_cause": {
            "title": "Feeder-Line-4B Burst Pipe",
            "description": "Aging municipal water pipe (18 years in service) suffered pressure spike leading to seam rupture under Apartment Road.",
            "confidence": ConfidenceLevel.HIGH,
            "supporting_evidence": [
                "Pressure drop telemetry (28.5 PSI) on Feeder Line 4B",
                "Confirmed standing water report (INC-8892) matching pipe junction",
                "Water utility sensor #104 continuous flow alarm"
            ],
            "alternative_explanations": [
                "Surface storm drain clog from recent heavy rainfall",
                "Private residential overhead tank overflow"
            ]
        },
        "impact": {
            "affected_routes_count": 2,
            "affected_locations_count": 4,
            "estimated_people_affected": 120,
            "severity": "HIGH",
            "impact_chain": [
                "Water Pipeline Leak",
                "Road Flooding",
                "Traffic Congestion",
                "Bus Transit Delay",
                "Commuter Delay"
            ]
        },
        "actions": [
            {
                "id": "act-1",
                "title": "Dispatch BWSSB Emergency Pipeline Valve Crew",
                "action_type": "immediate",
                "description": "Isolate Feeder Line 4B valve #12 to halt main leak flow and start emergency patch.",
                "reason": "Stops continuous water spill (120 L/min) and reduces road water depth.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            },
            {
                "id": "act-2",
                "title": "Issue Traffic Advisory & Divert Route 500-D",
                "action_type": "reporting",
                "description": "Reroute public transit via Service Road 2A to bypass flooded 300m stretch.",
                "reason": "Restores bus flow and avoids 40-minute delay for commuters.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            },
            {
                "id": "act-3",
                "title": "Automated Civic Escalation Ticket",
                "action_type": "communication",
                "description": "Submit correlated incident packet to Water Board & Traffic Police Dispatch.",
                "reason": "Provides unified evidence graph to accelerate joint agency response.",
                "priority": "MEDIUM",
                "status": ActionStatusEnum.PENDING
            }
        ],
        "agent_events": [
            {"id": "ae-1", "timestamp": "10:42:01 AM", "stage": "01 - Understand", "message": "Parsed input: Classified as WATER & TRAFFIC problem at Apartment Road.", "tool_called": None},
            {"id": "ae-2", "timestamp": "10:42:03 AM", "stage": "02 - Investigate", "message": "Executing get_water_infrastructure_status() and get_nearby_incidents().", "tool_called": "get_water_infrastructure_status"},
            {"id": "ae-3", "timestamp": "10:42:06 AM", "stage": "03 - Connect", "message": "Building Problem Graph: Discovered water leak causing traffic congestion.", "tool_called": "get_traffic_status"},
            {"id": "ae-4", "timestamp": "10:42:09 AM", "stage": "04 - Verify", "message": "Correlating evidence: Verified bus delay connected to flooded bottleneck.", "tool_called": "get_bus_status"},
            {"id": "ae-5", "timestamp": "10:42:12 AM", "stage": "05 - Act", "message": "Identified probable root cause with HIGH confidence. Generated Action Plan.", "tool_called": None}
        ],
        "monitoring": {
            "metric_name": "Bus 500-D Delay",
            "value_before": "40 minutes",
            "value_after": "10 minutes",
            "status": "IMPROVING",
            "last_check_time": "Just now",
            "trend": "IMPROVING"
        }
    },

    "bus": {
        "id": "INV-2026-002",
        "title": "Public Transit Route 500-D Disruption",
        "category": CategoryEnum.BUS,
        "input_text": "The bus hasn't arrived at my stop for 40 minutes.",
        "location": "Silk Board Bus Stop, Outer Ring Road",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "status": InvestigationStatusEnum.ACTION_REQUIRED,
        "is_simulated": True,
        "nodes": [
            {
                "id": "node-incident",
                "label": "Road Accident at Bellandur",
                "category": CategoryEnum.TRAFFIC,
                "node_type": NodeTypeEnum.EVENT,
                "description": "Two-truck collision blocking 2 right lanes near Bellandur flyover.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-traffic-bus",
                "label": "Outer Ring Road Gridlock",
                "category": CategoryEnum.TRAFFIC,
                "node_type": NodeTypeEnum.PROBLEM,
                "description": "Tailback extending 2.8km up to Iblur Junction.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-route",
                "label": "Route 500-D Frequency Drop",
                "category": CategoryEnum.BUS,
                "node_type": NodeTypeEnum.EVENT,
                "description": "3 buses stranded in gridlock, increasing headway from 8 mins to 40 mins.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-delay",
                "label": "40-Min Bus Delay",
                "category": CategoryEnum.BUS,
                "node_type": NodeTypeEnum.PROBLEM,
                "description": "Passenger waiting time elevated to 40 minutes across 6 stops.",
                "severity": "MEDIUM",
                "status": "ACTIVE"
            },
            {
                "id": "node-affected",
                "label": "250 Passengers Affected",
                "category": CategoryEnum.BUS,
                "node_type": NodeTypeEnum.IMPACT,
                "description": "Commuters stranded at Silk Board and HSR Layout stops during morning peak.",
                "severity": "HIGH",
                "status": "ACTIVE"
            }
        ],
        "edges": [
            {"id": "eb1", "source": "node-incident", "target": "node-traffic-bus", "label": "Causes congestion", "relationship_type": "causes"},
            {"id": "eb2", "source": "node-traffic-bus", "target": "node-route", "label": "Blocks transit", "relationship_type": "blocks"},
            {"id": "eb3", "source": "node-route", "target": "node-delay", "label": "Results in", "relationship_type": "leads_to"},
            {"id": "eb4", "source": "node-delay", "target": "node-affected", "label": "Impacts", "relationship_type": "impacts"}
        ],
        "evidence": [
            {
                "id": "ev-b1",
                "source_tool": "get_nearby_incidents",
                "title": "Traffic Control Log #771",
                "finding": "Truck accident reported on Bellandur Flyover at 09:15 AM. Tow vehicle dispatched.",
                "timestamp": "09:40 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-incident"],
                "is_demo_data": True
            },
            {
                "id": "ev-b2",
                "source_tool": "get_bus_status",
                "title": "BMTC Fleet Telemetry",
                "finding": "Buses KA-01-F-1102 and KA-01-F-3389 stationary for 32 minutes.",
                "timestamp": "09:42 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-route"],
                "is_demo_data": True
            }
        ],
        "root_cause": {
            "title": "Bellandur Flyover Vehicle Collision",
            "description": "Freight vehicle collision at 09:15 AM obstructed 2 out of 3 transit lanes on Outer Ring Road.",
            "confidence": ConfidenceLevel.HIGH,
            "supporting_evidence": ["Traffic camera footage log #771", "GPS telemetry of 3 frozen bus units"],
            "alternative_explanations": ["Bus fleet strike or driver shortage"]
        },
        "impact": {
            "affected_routes_count": 3,
            "affected_locations_count": 6,
            "estimated_people_affected": 250,
            "severity": "HIGH",
            "impact_chain": ["Road Collision", "Gridlock", "Route Disruption", "Passenger Delay"]
        },
        "actions": [
            {
                "id": "act-b1",
                "title": "Notify Commuters & Suggest Metro Alternative",
                "action_type": "immediate",
                "description": "Broadcast SMS alert to passengers with Indiranagar Metro connection guide.",
                "reason": "Provides immediate alternative transit options for stranded riders.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            },
            {
                "id": "act-b2",
                "title": "Request Tow Crane Expedite from Traffic Police",
                "action_type": "reporting",
                "description": "Send priority clearance request to East Division Traffic Control.",
                "reason": "Clears blocked lanes to restore transit flow.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            }
        ],
        "agent_events": [
            {"id": "ae-b1", "timestamp": "09:40:01 AM", "stage": "01 - Understand", "message": "Analyzed complaint: Bus route delay reported at Silk Board.", "tool_called": None},
            {"id": "ae-b2", "timestamp": "09:40:04 AM", "stage": "02 - Investigate", "message": "Invoked get_bus_status() & get_nearby_incidents().", "tool_called": "get_bus_status"}
        ],
        "monitoring": {
            "metric_name": "Bus Arrival Gap",
            "value_before": "40 mins",
            "value_after": "12 mins",
            "status": "IMPROVING",
            "last_check_time": "2 mins ago",
            "trend": "IMPROVING"
        }
    },

    "garbage": {
        "id": "INV-2026-003",
        "title": "Uncollected Waste Accumulation",
        "category": CategoryEnum.GARBAGE,
        "input_text": "Garbage hasn't been collected in our street for three days.",
        "location": "Ward 174, 14th Main, HSR Layout",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "status": InvestigationStatusEnum.ACTION_REQUIRED,
        "is_simulated": True,
        "nodes": [
            {
                "id": "node-vehicle",
                "label": "Collection Truck Breakdown",
                "category": CategoryEnum.GARBAGE,
                "node_type": NodeTypeEnum.CAUSE,
                "description": "Primary waste compactor truck (KA-01-GA-4412) down with mechanical failure.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-route-skip",
                "label": "Route 4 Missed Collection",
                "category": CategoryEnum.GARBAGE,
                "node_type": NodeTypeEnum.EVENT,
                "description": "3 consecutive days of missed door-to-door collection across Sector 3.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-accum",
                "label": "450kg Garbage Accumulation",
                "category": CategoryEnum.GARBAGE,
                "node_type": NodeTypeEnum.PROBLEM,
                "description": "Overflowing black bags near residential corners creating health and odor hazard.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-g-impact",
                "label": "180 Households Affected",
                "category": CategoryEnum.GARBAGE,
                "node_type": NodeTypeEnum.IMPACT,
                "description": "Residents facing foul odor, stray animal disturbance, and sanitary concerns.",
                "severity": "MEDIUM",
                "status": "ACTIVE"
            }
        ],
        "edges": [
            {"id": "eg1", "source": "node-vehicle", "target": "node-route-skip", "label": "Causes missed route", "relationship_type": "causes"},
            {"id": "eg2", "source": "node-route-skip", "target": "node-accum", "label": "Leads to waste accumulation", "relationship_type": "leads_to"},
            {"id": "eg3", "source": "node-accum", "target": "node-g-impact", "label": "Impacts environment", "relationship_type": "impacts"}
        ],
        "evidence": [
            {
                "id": "ev-g1",
                "source_tool": "get_garbage_collection_status",
                "title": "Waste Management Depot Log",
                "finding": "Truck KA-01-GA-4412 logged at workshop for transmission replacement since Tuesday.",
                "timestamp": "08:10 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-vehicle"],
                "is_demo_data": True
            }
        ],
        "root_cause": {
            "title": "Compactor Truck Breakdown & Missing Reserve Fleet",
            "description": "Depot vehicle breakdown coupled with failure to dispatch backup compactor truck for Sector 3 route.",
            "confidence": ConfidenceLevel.HIGH,
            "supporting_evidence": ["Depot repair telemetry", "3-day missed GPS log"],
            "alternative_explanations": ["Sanitation worker strike"]
        },
        "impact": {
            "affected_routes_count": 1,
            "affected_locations_count": 3,
            "estimated_people_affected": 180,
            "severity": "MEDIUM",
            "impact_chain": ["Vehicle Breakdown", "Missed Collection", "Garbage Pileup", "Public Health Concern"]
        },
        "actions": [
            {
                "id": "act-g1",
                "title": "Dispatch Reserve Truck KA-01-GA-9021",
                "action_type": "immediate",
                "description": "Reassign backup compactor vehicle to clear 3-day backlog in Ward 174 Sector 3.",
                "reason": "Immediately eliminates accumulated 450kg waste.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            }
        ],
        "agent_events": [
            {"id": "ae-g1", "timestamp": "08:10:01 AM", "stage": "01 - Understand", "message": "Parsed GARBAGE complaint for Ward 174.", "tool_called": "get_garbage_collection_status"}
        ],
        "monitoring": {
            "metric_name": "Waste Backlog Level",
            "value_before": "450 kg",
            "value_after": "0 kg",
            "status": "IMPROVING",
            "last_check_time": "1 hour ago",
            "trend": "IMPROVING"
        }
    },

    "traffic": {
        "id": "INV-2026-004",
        "title": "Severe College Junction Traffic Jam",
        "category": CategoryEnum.TRAFFIC,
        "input_text": "Traffic near my college is unusually heavy.",
        "location": "College Cross Road, Indiranagar",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "status": InvestigationStatusEnum.ACTION_REQUIRED,
        "is_simulated": True,
        "nodes": [
            {
                "id": "node-signal-fail",
                "label": "Signal Control Board Failure",
                "category": CategoryEnum.TRAFFIC,
                "node_type": NodeTypeEnum.CAUSE,
                "description": "Traffic Light #4 stuck on permanent red due to short circuit.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-queue",
                "label": "1.4km Vehicle Tailback",
                "category": CategoryEnum.TRAFFIC,
                "node_type": NodeTypeEnum.PROBLEM,
                "description": "Uncontrolled 4-way intersection gridlock during morning college commute hour.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-t-bus",
                "label": "Bus & Student Transit Delay",
                "category": CategoryEnum.BUS,
                "node_type": NodeTypeEnum.EVENT,
                "description": "Student shuttle buses stuck in bottleneck; exam center arrivals delayed.",
                "severity": "HIGH",
                "status": "ACTIVE"
            }
        ],
        "edges": [
            {"id": "et1", "source": "node-signal-fail", "target": "node-queue", "label": "Causes gridlock", "relationship_type": "causes"},
            {"id": "et2", "source": "node-queue", "target": "node-t-bus", "label": "Delays transit", "relationship_type": "delays"}
        ],
        "evidence": [
            {
                "id": "ev-t1",
                "source_tool": "get_traffic_status",
                "title": "Traffic Control System Telemetry",
                "finding": "Signal #4 reported electrical error. Congestion index 8.7/10.",
                "timestamp": "09:05 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-signal-fail"],
                "is_demo_data": True
            }
        ],
        "root_cause": {
            "title": "Signal Control Board Power Short Circuit",
            "description": "Signal #4 junction power surge locked all 4 light phases in blinking red mode.",
            "confidence": ConfidenceLevel.HIGH,
            "supporting_evidence": ["Signal controller hardware fault status report"],
            "alternative_explanations": ["VIP convoy movement"]
        },
        "impact": {
            "affected_routes_count": 2,
            "affected_locations_count": 2,
            "estimated_people_affected": 320,
            "severity": "HIGH",
            "impact_chain": ["Signal Malfunction", "Intersection Tailback", "College Transit Delay"]
        },
        "actions": [
            {
                "id": "act-t1",
                "title": "Manual Traffic Warden Deployment",
                "action_type": "immediate",
                "description": "Dispatch 2 traffic officers to manually override intersection flow.",
                "reason": "Instantly resolves 1.4km tailback while repair team fixes signal hardware.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            }
        ],
        "agent_events": [
            {"id": "ae-t1", "timestamp": "09:05:01 AM", "stage": "01 - Understand", "message": "Investigating college junction congestion report.", "tool_called": "get_traffic_status"}
        ],
        "monitoring": {
            "metric_name": "Intersection Speed",
            "value_before": "4 km/h",
            "value_after": "22 km/h",
            "status": "IMPROVING",
            "last_check_time": "15 mins ago",
            "trend": "IMPROVING"
        }
    },

    "apartment": {
        "id": "INV-2026-005",
        "title": "Recurring Elevator Breakdown in Apartment Block B",
        "category": CategoryEnum.APARTMENT,
        "input_text": "The lift in our apartment keeps breaking down.",
        "location": "Sunrise Heights Complex, Block B, Whitefield",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "status": InvestigationStatusEnum.ACTION_REQUIRED,
        "is_simulated": True,
        "nodes": [
            {
                "id": "node-hist-fail",
                "label": "4-Month Defective Inverter Card",
                "category": CategoryEnum.APARTMENT,
                "node_type": NodeTypeEnum.CAUSE,
                "description": "Over-aged power inverter card experiencing thermal shutdowns under peak load.",
                "severity": "HIGH",
                "status": "ACTIVE",
                "data": {"timeline": "June, July, August, September breakdown record"}
            },
            {
                "id": "node-repeat-break",
                "label": "Repeated Lift Downtime",
                "category": CategoryEnum.APARTMENT,
                "node_type": NodeTypeEnum.PROBLEM,
                "description": "Lift B2 out of service 4 times in 120 days during rush hours.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-resident-impact",
                "label": "75 Residents Affected (Senior Citizens)",
                "category": CategoryEnum.APARTMENT,
                "node_type": NodeTypeEnum.IMPACT,
                "description": "Residents on floors 6-12 forced to use stairs; 8 elderly residents isolated.",
                "severity": "HIGH",
                "status": "ACTIVE"
            }
        ],
        "edges": [
            {"id": "ea1", "source": "node-hist-fail", "target": "node-repeat-break", "label": "Causes failure pattern", "relationship_type": "causes"},
            {"id": "ea2", "source": "node-repeat-break", "target": "node-resident-impact", "label": "Inconveniences", "relationship_type": "impacts"}
        ],
        "evidence": [
            {
                "id": "ev-a1",
                "source_tool": "get_apartment_maintenance_history",
                "title": "Maintenance Audit Log (June - Sept 2026)",
                "finding": "June: Door sensor fix; July: Motor overheated; Aug: Reset circuit; Sept: Power failure. Recurring maintenance pattern detected!",
                "timestamp": "07:30 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-hist-fail"],
                "is_demo_data": True
            }
        ],
        "root_cause": {
            "title": "Deferred Replacement of Primary Drive Inverter Card",
            "description": "Maintenance provider repeatedly performed temporary resets instead of replacing the degraded drive inverter card.",
            "confidence": ConfidenceLevel.HIGH,
            "supporting_evidence": [
                "June 2026 ticket: Sensor Patch",
                "July 2026 ticket: Motor Refill",
                "August 2026 ticket: Circuit Reset",
                "September 2026 ticket: Control Board Failure"
            ],
            "alternative_explanations": ["Passenger weight capacity violation"]
        },
        "impact": {
            "affected_routes_count": 0,
            "affected_locations_count": 1,
            "estimated_people_affected": 75,
            "severity": "HIGH",
            "impact_chain": ["Unreplaced Defective Inverter", "Repeated Outages", "Resident Confinement"]
        },
        "actions": [
            {
                "id": "act-a1",
                "title": "Mandate Inverter Board Replacement & Vendor Audit",
                "action_type": "immediate",
                "description": "Escalate to RWA committee to approve full replacement of main drive board instead of temporary resets.",
                "reason": "Breaks 4-month failure loop permanently.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            }
        ],
        "agent_events": [
            {"id": "ae-a1", "timestamp": "07:30:01 AM", "stage": "01 - Understand", "message": "Analyzed historical complaint records for Sunrise Heights.", "tool_called": "get_apartment_maintenance_history"}
        ],
        "monitoring": {
            "metric_name": "Lift B2 Uptime",
            "value_before": "62% Operational",
            "value_after": "99.8% Operational",
            "status": "IMPROVING",
            "last_check_time": "Today",
            "trend": "IMPROVING"
        }
    },

    "hospital": {
        "id": "INV-2026-006",
        "title": "OPD Wait Time Surge & Queue Bottleneck",
        "category": CategoryEnum.HOSPITAL,
        "input_text": "I've been waiting for my appointment for two hours.",
        "location": "City General Hospital OPD, Block 2",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "status": InvestigationStatusEnum.ACTION_REQUIRED,
        "is_simulated": True,
        "nodes": [
            {
                "id": "node-er-divert",
                "label": "Emergency Room Triage Diversion",
                "category": CategoryEnum.HOSPITAL,
                "node_type": NodeTypeEnum.CAUSE,
                "description": "2 Senior Physicians diverted from General Medicine OPD to Trauma ER following Highway Accident at 08:45 AM.",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-opd-delay",
                "label": "135-Minute OPD Queue Wait",
                "category": CategoryEnum.HOSPITAL,
                "node_type": NodeTypeEnum.PROBLEM,
                "description": "Queue backlog swelled to 42 patients with 135 minutes avg wait time (normal: 25 mins).",
                "severity": "HIGH",
                "status": "ACTIVE"
            },
            {
                "id": "node-h-impact",
                "label": "42 Outpatients Affected",
                "category": CategoryEnum.HOSPITAL,
                "node_type": NodeTypeEnum.IMPACT,
                "description": "Patients waiting in overcrowded lobby; non-emergency token progression delayed.",
                "severity": "MEDIUM",
                "status": "ACTIVE"
            }
        ],
        "edges": [
            {"id": "eh1", "source": "node-er-divert", "target": "node-opd-delay", "label": "Reduces OPD capacity", "relationship_type": "causes"},
            {"id": "eh2", "source": "node-opd-delay", "target": "node-h-impact", "label": "Delays patients", "relationship_type": "impacts"}
        ],
        "evidence": [
            {
                "id": "ev-h1",
                "source_tool": "get_hospital_queue_status",
                "title": "Hospital Management System Log",
                "finding": "2 Physicians reassigned to Trauma ICU at 08:45 AM. Queue surged from 12 to 42 tokens.",
                "timestamp": "10:50 AM",
                "confidence": ConfidenceLevel.HIGH,
                "related_node_ids": ["node-er-divert"],
                "is_demo_data": True
            }
        ],
        "root_cause": {
            "title": "Mass Casualty Emergency Re-allocation of OPD Staff",
            "description": "Emergency triage diversion of senior doctors to ICU created staff shortage in general medicine OPD.",
            "confidence": ConfidenceLevel.HIGH,
            "supporting_evidence": ["ER diversion log #409", "OPD digital token backlog telemetry"],
            "alternative_explanations": ["Electronic health record software outage"]
        },
        "impact": {
            "affected_routes_count": 0,
            "affected_locations_count": 1,
            "estimated_people_affected": 42,
            "severity": "MEDIUM",
            "impact_chain": ["Highway Emergency Diversion", "OPD Staff Deficit", "Queue Surge", "Patient Wait Time"]
        },
        "actions": [
            {
                "id": "act-h1",
                "title": "Activate Fast-Track Tele-Consult Kiosk & Counter 3B",
                "action_type": "immediate",
                "description": "Open auxiliary OPD Desk 3B with resident physician and issue digital consult tokens.",
                "reason": "Reduces OPD queue from 135 mins down to 20 mins without compromising ER care.",
                "priority": "HIGH",
                "status": ActionStatusEnum.PENDING
            }
        ],
        "agent_events": [
            {"id": "ae-h1", "timestamp": "10:50:01 AM", "stage": "01 - Understand", "message": "Analyzed OPD wait time complaint. Executing hospital queue telemetry tool.", "tool_called": "get_hospital_queue_status"}
        ],
        "monitoring": {
            "metric_name": "OPD Queue Wait Time",
            "value_before": "135 minutes",
            "value_after": "20 minutes",
            "status": "IMPROVING",
            "last_check_time": "10 mins ago",
            "trend": "IMPROVING"
        }
    }
}
