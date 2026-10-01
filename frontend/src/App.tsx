import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewInvestigationPage } from './pages/NewInvestigationPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { GraphPage } from './pages/GraphPage';
import { EvidencePage } from './pages/EvidencePage';
import { ActionCenterPage } from './pages/ActionCenterPage';
import { HistoryPage } from './pages/HistoryPage';

import { Investigation, CategoryType } from './types';
import { fetchInvestigations, createInvestigation } from './services/api';
import { MOCK_SCENARIOS } from './data/mockScenarios';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [investigations, setInvestigations] = useState<Investigation[]>([]);
  const [activeInvestigation, setActiveInvestigation] = useState<Investigation>(MOCK_SCENARIOS.water);
  const [newInputText, setNewInputText] = useState<string>('');
  const [newCategory, setNewCategory] = useState<CategoryType | undefined>(undefined);

  useEffect(() => {
    async function loadData() {
      const data = await fetchInvestigations();
      setInvestigations(data);
      if (data.length > 0) {
        setActiveInvestigation(data[0]);
      }
    }
    loadData();
  }, []);

  const handleStartNew = () => {
    setNewInputText('');
    setNewCategory(undefined);
    setActiveTab('new');
  };

  const handleSelectScenario = async (category: CategoryType, text: string) => {
    const inv = await createInvestigation(text, category, 'Bengaluru Urban');
    setActiveInvestigation(inv);
    // Refresh investigations list
    const data = await fetchInvestigations();
    setInvestigations(data);
    setActiveTab('workspace');
  };

  const handleSubmitProblem = async (text: string, category?: CategoryType, location?: string) => {
    const inv = await createInvestigation(text, category, location);
    setActiveInvestigation(inv);
    const data = await fetchInvestigations();
    setInvestigations(data);
    setActiveTab('workspace');
  };

  const handleOpenWorkspace = (inv: Investigation) => {
    setActiveInvestigation(inv);
    setActiveTab('workspace');
  };

  const handleUpdateInvestigation = (inv: Investigation) => {
    setActiveInvestigation({ ...inv });
    setInvestigations(prev => prev.map(i => i.id === inv.id ? inv : i));
  };

  return (
    <div className="min-h-screen bg-darkBg text-slate-100 flex flex-col font-sans bg-grid-pattern relative">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page View Routing */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStart={handleStartNew}
            onSelectScenario={handleSelectScenario}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            investigations={investigations}
            onOpenWorkspace={handleOpenWorkspace}
          />
        )}

        {activeTab === 'new' && (
          <NewInvestigationPage
            onSubmit={handleSubmitProblem}
            initialText={newInputText}
            initialCategory={newCategory}
          />
        )}

        {activeTab === 'workspace' && (
          <WorkspacePage
            investigation={activeInvestigation}
            onUpdateInvestigation={handleUpdateInvestigation}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'graph' && (
          <GraphPage investigation={activeInvestigation} />
        )}

        {activeTab === 'evidence' && (
          <EvidencePage investigations={investigations} />
        )}

        {activeTab === 'actions' && (
          <ActionCenterPage
            investigations={investigations}
            onUpdateInvestigation={handleUpdateInvestigation}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            investigations={investigations}
            onSelectInvestigation={handleOpenWorkspace}
          />
        )}
      </main>

      {/* Bottom Footer */}
      <Footer onStart={handleStartNew} />
    </div>
  );
}

export default App;
