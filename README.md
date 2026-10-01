# BHARAT PROBLEM SOLVER
### “Report the symptom. Discover the problem behind it.”

An **Agentic AI Problem Investigation and Resolution Platform** for Hackathons.

---

## 🌟 CORE IDEA

Bharat Problem Solver is an agentic AI platform that takes real-world civic complaints, discovers connected infrastructure and transit issues, builds a dynamic Problem Graph (React Flow), identifies probable root causes, evaluates system impact, recommends human-approved action plans, and monitors telemetry outcomes.

It supports six core real-world problem categories:
1. 🚌 **Bus / Public Transport**
2. 🗑️ **Garbage / Waste Collection**
3. 🚦 **Traffic / Road Congestion**
4. 💧 **Water Leakage / Supply**
5. 🏢 **Apartment / Residential Complaints**
6. 🏥 **Hospital Queue / Waiting Time**

---

## 🚀 ARCHITECTURE & TECH STACK

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Flow (`@xyflow/react`), Recharts, Framer Motion, Lucide Icons
- **Backend**: Python, FastAPI, Pydantic, Uvicorn
- **AI Agent Engine**: Google Gemini API integration with deterministic fallback Demo Mode
- **Simulated Tooling**: 12 custom telemetry tools (`get_bus_status`, `get_traffic_status`, `get_water_infrastructure_status`, `get_garbage_collection_status`, `get_apartment_maintenance_history`, `get_hospital_queue_status`, etc.)

---

## ⚡ QUICK START

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python run.py
```
The FastAPI backend will start live at `http://127.0.0.1:8000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The React Vite frontend will start live at `http://localhost:5173`.

---

## 🛡️ DEMO MODE & RELIABILITY

The application features a built-in **Demo Mode**. If external API keys or network services are unavailable, the application transparently runs using deterministic telemetry scenarios, ensuring a 100% reliable hackathon presentation.
