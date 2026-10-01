import { Investigation, CategoryType } from '../types';
import { MOCK_SCENARIOS } from '../data/mockScenarios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// In-memory local client store fallback
const localStore: Record<string, Investigation> = { ...MOCK_SCENARIOS };

function classifyLocally(text: string): CategoryType {
  const t = text.toLowerCase();
  if (t.includes('water') || t.includes('leak') || t.includes('flood') || t.includes('pipe')) return 'water';
  if (t.includes('bus') || t.includes('stop') || t.includes('route') || t.includes('transit')) return 'bus';
  if (t.includes('garbage') || t.includes('waste') || t.includes('trash') || t.includes('smell')) return 'garbage';
  if (t.includes('traffic') || t.includes('jam') || t.includes('signal') || t.includes('road')) return 'traffic';
  if (t.includes('lift') || t.includes('elevator') || t.includes('apartment') || t.includes('flats')) return 'apartment';
  if (t.includes('hospital') || t.includes('doctor') || t.includes('opd') || t.includes('appointment') || t.includes('wait')) return 'hospital';
  return 'water';
}

export async function fetchInvestigations(category?: string, status?: string, search?: string): Promise<Investigation[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/investigations?${params.toString()}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend API unreachable, using local fallback store.', err);
  }

  // Local fallback filter
  let list = Object.values(localStore);
  if (category && category !== 'all') {
    list = list.filter(i => i.category === category);
  }
  if (status && status !== 'all') {
    list = list.filter(i => i.status === status);
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(i => i.title.toLowerCase().includes(s) || i.input_text.toLowerCase().includes(s) || i.id.toLowerCase().includes(s));
  }
  return list;
}

export async function fetchInvestigationById(id: string): Promise<Investigation> {
  try {
    const res = await fetch(`${API_BASE_URL}/investigations/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend API unreachable, returning local investigation.', err);
  }

  // Check by exact key or match by scenario
  if (localStore[id]) return localStore[id];
  const found = Object.values(localStore).find(i => i.id === id);
  if (found) return found;
  return localStore.water; // Default fallback
}

export async function createInvestigation(inputText: string, category?: CategoryType, location?: string): Promise<Investigation> {
  const cat = category || classifyLocally(inputText);
  try {
    const res = await fetch(`${API_BASE_URL}/investigations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_text: inputText, category: cat, location: location || 'Bengaluru Urban' })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend offline, generating local investigation.', err);
  }

  // Fallback generation logic
  const base = MOCK_SCENARIOS[cat] || MOCK_SCENARIOS.water;
  const newId = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
  const newInv: Investigation = {
    ...base,
    id: newId,
    input_text: inputText,
    category: cat,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    location: location || 'Bengaluru Urban',
    status: 'ACTION_REQUIRED'
  };
  localStore[newId] = newInv;
  return newInv;
}

export async function approveActionApi(invId: string, actionId: string): Promise<Investigation> {
  try {
    const res = await fetch(`${API_BASE_URL}/investigations/${invId}/actions/${actionId}/approve`, {
      method: 'POST'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline, approving action locally.', err);
  }

  const inv = await fetchInvestigationById(invId);
  inv.actions.forEach(a => {
    if (a.id === actionId) a.status = 'APPROVED';
  });
  inv.status = 'ACTION_APPROVED';
  inv.agent_events.push({
    id: `ae-${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toLocaleTimeString(),
    stage: '05 - Human Approval',
    message: `Action '${actionId}' APPROVED by operator. Executing resolution workflow...`
  });
  localStore[invId] = inv;
  return { ...inv };
}

export async function triggerMonitoringApi(invId: string): Promise<Investigation> {
  try {
    const res = await fetch(`${API_BASE_URL}/investigations/${invId}/monitor`, {
      method: 'POST'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline, updating monitoring locally.', err);
  }

  const inv = await fetchInvestigationById(invId);
  inv.status = 'RESOLVED';
  if (inv.monitoring) {
    inv.monitoring.status = 'RESOLVED';
    inv.monitoring.trend = 'IMPROVING';
    inv.monitoring.last_check_time = 'Just now';
  }
  inv.agent_events.push({
    id: `ae-${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toLocaleTimeString(),
    stage: '06 - Monitor & Update',
    message: 'Monitored telemetric recovery: Disruption metric returned to normal baseline. Problem Graph updated.'
  });
  localStore[invId] = inv;
  return { ...inv };
}
