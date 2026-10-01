from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Optional
from datetime import datetime

from app.config import settings
from app.models.schemas import (
    Investigation, CreateInvestigationRequest, ActionApprovalRequest,
    CategoryEnum, InvestigationStatusEnum
)
from app.agents.investigator import investigator_engine
from app.data.scenarios import SCENARIOS

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_PREFIX}/openapi.json"
)

# Enable CORS for local React Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store initialized with pre-seeded scenarios
investigations_db: Dict[str, Investigation] = {}

def init_db():
    if not investigations_db:
        for cat, sc in SCENARIOS.items():
            inv = investigator_engine.create_investigation(
                input_text=sc["input_text"],
                category=CategoryEnum(cat),
                location=sc["location"]
            )
            # Retain fixed scenario ID for deterministic demo access
            inv.id = sc["id"]
            investigations_db[inv.id] = inv

init_db()

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "demo_mode": settings.DEMO_MODE,
        "total_active_investigations": len(investigations_db)
    }

@app.post("/api/classify")
def classify_problem_text(payload: Dict[str, str]):
    text = payload.get("input_text", "")
    category = investigator_engine.classify_problem(text)
    return {"input_text": text, "category": category.value}

@app.get("/api/investigations", response_model=List[Investigation])
def list_investigations(
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None
):
    results = list(investigations_db.values())
    if category and category != "all":
        results = [i for i in results if i.category.value.lower() == category.lower()]
    if status and status != "all":
        results = [i for i in results if i.status.value.lower() == status.lower()]
    if search:
        s = search.lower()
        results = [
            i for i in results
            if s in i.title.lower() or s in i.input_text.lower() or s in i.location.lower() or s in i.id.lower()
        ]
    return results

@app.post("/api/investigations", response_model=Investigation)
def create_investigation(req: CreateInvestigationRequest):
    inv = investigator_engine.create_investigation(
        input_text=req.input_text,
        category=req.category,
        location=req.location or "Bengaluru Urban"
    )
    investigations_db[inv.id] = inv
    return inv

@app.get("/api/investigations/{inv_id}", response_model=Investigation)
def get_investigation(inv_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return investigations_db[inv_id]

@app.post("/api/investigations/{inv_id}/run", response_model=Investigation)
def run_investigation_agent(inv_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    inv = investigations_db[inv_id]
    inv.status = InvestigationStatusEnum.ACTION_REQUIRED
    inv.updated_at = datetime.now().isoformat()
    return inv

@app.get("/api/investigations/{inv_id}/graph")
def get_investigation_graph(inv_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    inv = investigations_db[inv_id]
    return {"nodes": inv.nodes, "edges": inv.edges}

@app.get("/api/investigations/{inv_id}/evidence")
def get_investigation_evidence(inv_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return {"evidence": investigations_db[inv_id].evidence}

@app.get("/api/investigations/{inv_id}/actions")
def get_investigation_actions(inv_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return {"actions": investigations_db[inv_id].actions}

@app.post("/api/investigations/{inv_id}/actions/{action_id}/approve", response_model=Investigation)
def approve_action(inv_id: str, action_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    inv = investigator_engine.approve_action(investigations_db[inv_id], action_id)
    investigations_db[inv_id] = inv
    return inv

@app.post("/api/investigations/{inv_id}/actions/{action_id}/reject", response_model=Investigation)
def reject_action(inv_id: str, action_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    inv = investigator_engine.reject_action(investigations_db[inv_id], action_id)
    investigations_db[inv_id] = inv
    return inv

@app.post("/api/investigations/{inv_id}/monitor", response_model=Investigation)
def monitor_investigation(inv_id: str):
    if inv_id not in investigations_db:
        raise HTTPException(status_code=404, detail="Investigation not found")
    inv = investigator_engine.trigger_monitoring(investigations_db[inv_id])
    investigations_db[inv_id] = inv
    return inv
