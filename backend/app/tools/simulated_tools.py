from typing import Dict, Any, List
from datetime import datetime

def get_bus_status(route_id: str = "500-D", stop_name: str = "Silk Board") -> Dict[str, Any]:
    """Retrieves real-time bus telemetry and delay records."""
    return {
        "tool": "get_bus_status",
        "route_id": route_id,
        "stop_name": stop_name,
        "scheduled_time": "10:15 AM",
        "actual_estimated_arrival": "10:55 AM",
        "delay_minutes": 40,
        "active_buses_on_route": 2,
        "route_bottleneck": "Heavy congestion near Bellandur Flyover",
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_route_status(route_name: str = "Outer Ring Road") -> Dict[str, Any]:
    """Retrieves route-level transit telemetry and disruption logs."""
    return {
        "tool": "get_route_status",
        "route_name": route_name,
        "status": "DISRUPTED",
        "average_speed_kmh": 6.5,
        "normal_speed_kmh": 32.0,
        "disruption_cause": "Road flooding caused by major pipe burst",
        "affected_intersections": ["Kadubeesanahalli Junction", "Marathahalli Bridge"],
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_traffic_status(location: str = "Koramangala") -> Dict[str, Any]:
    """Retrieves traffic density, congestion index, and signal operation status."""
    return {
        "tool": "get_traffic_status",
        "location": location,
        "congestion_index": 8.7, # out of 10
        "congestion_level": "HEAVY",
        "active_signal_issue": True,
        "signal_location": "College Cross Road Signal #4",
        "tailback_length_meters": 1400,
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_nearby_incidents(location: str = "MG Road") -> Dict[str, Any]:
    """Searches for active civic or traffic incidents within 3km radius."""
    return {
        "tool": "get_nearby_incidents",
        "location": location,
        "incidents_found": 1,
        "incidents": [
            {
                "incident_id": "INC-8892",
                "type": "Road Waterlogging",
                "severity": "HIGH",
                "description": "3-inch standing water accumulation blocking left two lanes",
                "reported_at": "09:30 AM",
                "status": "UNRESOLVED"
            }
        ],
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_garbage_collection_status(ward_or_street: str = "Ward 174 - HSR Layout") -> Dict[str, Any]:
    """Inspects waste management truck GPS and collection compliance records."""
    return {
        "tool": "get_garbage_collection_status",
        "ward_or_street": ward_or_street,
        "last_collection_date": "3 days ago",
        "truck_assigned": "KA-01-GA-4412",
        "vehicle_status": "BREAKDOWN - Transmission failure at workshop",
        "backup_truck_dispatched": False,
        "accumulation_estimate_kg": 450,
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_water_infrastructure_status(zone: str = "Indiranagar Zone 3") -> Dict[str, Any]:
    """Monitors feeder pipeline pressure telemetry and leak sensors."""
    return {
        "tool": "get_water_infrastructure_status",
        "zone": zone,
        "main_pipeline": "Feeder-Line-4B",
        "pressure_drop_psi": 28.5,
        "sensor_alert": "LEAK DETECTED AT SENSOR #104",
        "estimated_leak_rate": "120 Liters/min",
        "underground_pipe_age_years": 18,
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_apartment_maintenance_history(building_id: str = "Sunrise Heights") -> Dict[str, Any]:
    """Retrieves multi-month maintenance ticket history and audit logs."""
    return {
        "tool": "get_apartment_maintenance_history",
        "building_id": building_id,
        "recurring_pattern_detected": True,
        "facility": "Elevator Block B",
        "historical_breakdowns": [
            {"month": "June 2026", "issue": "Door Sensor Malfunction", "resolution": "Temporary patch"},
            {"month": "July 2026", "issue": "Motor Overheating", "resolution": "Coolant refilled"},
            {"month": "August 2026", "issue": "Elevator Stuck between 3rd & 4th Floor", "resolution": "Reset circuit"},
            {"month": "September 2026", "issue": "Control Board Power Failure", "resolution": "Pending component replacement"}
        ],
        "primary_cause": "Deferred replacement of primary inverter card",
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_hospital_queue_status(department: str = "Outpatient OPD / General Medicine") -> Dict[str, Any]:
    """Retrieves hospital patient workflow, OPD queue count, and ER triage shifts."""
    return {
        "tool": "get_hospital_queue_status",
        "department": department,
        "current_queue_length": 42,
        "average_wait_minutes": 135,
        "emergency_triage_diversions": 3,
        "doctor_schedule_shift": "2 Senior Physicians redirected to Emergency Room at 08:45 AM due to multi-car accident",
        "normal_wait_minutes": 25,
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_nearby_alternatives(category: str, location: str) -> Dict[str, Any]:
    """Provides alternative routes, collection centers, or OPD counters."""
    if category == "bus":
        return {
            "tool": "get_nearby_alternatives",
            "category": category,
            "alternatives": [
                {"type": "Metro Station", "name": "Indiranagar Metro (Purple Line)", "distance": "800m", "eta_minutes": 12},
                {"type": "Express Bus", "name": "Bus 500-A (Alternative Route)", "eta_minutes": 8}
            ],
            "is_demo_data": True
        }
    elif category == "hospital":
        return {
            "tool": "get_nearby_alternatives",
            "category": category,
            "alternatives": [
                {"type": "Secondary OPD Desk", "name": "Fast-Track Clinic Counter 3B", "eta_minutes": 15},
                {"type": "Tele-Consult Token", "name": "Digital Queue Kiosk #2", "eta_minutes": 10}
            ],
            "is_demo_data": True
        }
    return {
        "tool": "get_nearby_alternatives",
        "category": category,
        "alternatives": [{"type": "General Alternate Route", "description": "Divert via Service Road 2A"}],
        "is_demo_data": True
    }

def get_weather_status(location: str) -> Dict[str, Any]:
    """Gets local rainfall and microclimate telemetry."""
    return {
        "tool": "get_weather_status",
        "location": location,
        "precipitation_mm": 42.0,
        "condition": "Heavy Rain past 3 hours",
        "drainage_overload_risk": "HIGH",
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_previous_complaints(category: str, location: str) -> Dict[str, Any]:
    """Retrieves civic complaint database records for location context."""
    return {
        "tool": "get_previous_complaints",
        "category": category,
        "location": location,
        "total_complaints_30_days": 19,
        "common_tag": "Infrastructure aging & delayed response",
        "resolution_rate_percent": 34.0,
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }

def get_affected_entities(problem_id: str) -> Dict[str, Any]:
    """Calculates downstream affected citizens, services, and locations."""
    return {
        "tool": "get_affected_entities",
        "problem_id": problem_id,
        "affected_citizens_count": 140,
        "affected_services": ["Public Bus Transit", "Local Commuters", "Commercial Access"],
        "affected_area_radius_km": 1.5,
        "is_demo_data": True,
        "timestamp": datetime.now().isoformat()
    }
